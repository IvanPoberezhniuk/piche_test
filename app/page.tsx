"use client";
import * as React from "react";

import dayjs, { Dayjs } from "dayjs";

import ErrorModal from "@/components/ErrorModal";
import SortableTable from "@/components/Table";
import {
  getWikiEvents,
  selectEventList,
  selectStatus,
  STATUS,
} from "@/libs/features/wikiEvents/eventsSlice";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import { LANG_LIST, Language } from "@/types/wiki";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

const styles = {
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: { xs: 1, md: 4 },
    minHeight: "100vh",
  },
  desc: {
    maxWidth: 670,
    textAlign: "center",
  },
  datePicker: {
    minWidth: 170,
  },
  form: {
    mt: 2,
    gap: 2,
    flexDirection: { sm: "row" },
    width: { xs: "100%", sm: "auto" },
  },
  tableContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 2,
    pt: 4,
  },
};

export default function Home() {
  const [language, setLanguage] = React.useState(Language.English);
  const [date, setDate] = React.useState<Dayjs>(dayjs());
  const handleChange = (event: any) => {
    setLanguage(event.target.value);
  };

  const dispatch = useAppDispatch();
  const eventsList = useAppSelector(selectEventList);
  const status = useAppSelector(selectStatus);
  const isLoading = status === STATUS.loading ? true : false;
  const hasError = status === STATUS.failed;

  const getEvents = () => {
    dispatch(getWikiEvents({ date, language }));
  };

  return (
    <Box component="main" sx={styles.main}>
      <Typography
        variant="h2"
        component="h1"
        data-testid="title"
        textAlign="center"
      >
        What happened on this date?
      </Typography>
      <Typography
        variant="h2"
        component="h1"
        color="primary.main"
        fontWeight={500}
      >
        {date.format("DD/MM/YYYY")}
      </Typography>
      <Stack sx={styles.form}>
        <DatePicker
          disabled={isLoading}
          sx={styles.datePicker}
          value={date}
          onChange={(newValue) => newValue && setDate(newValue)}
        />
        <FormControl fullWidth>
          <InputLabel id="language">Language</InputLabel>
          <Select
            disabled={isLoading}
            labelId="language"
            id="language"
            value={language}
            label="Language"
            onChange={handleChange}
          >
            {LANG_LIST.map(({ name, value }) => (
              <MenuItem key={value} value={value}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          disabled={isLoading}
          fullWidth
          variant="contained"
          onClick={getEvents}
        >
          {hasError ? "Try again" : "Load Events"}
        </Button>
      </Stack>
      <Stack sx={styles.tableContainer}>
        {!!eventsList?.births?.length && (
          <SortableTable list={eventsList.births} title="Births" />
        )}
        {!!eventsList?.deaths?.length && (
          <SortableTable list={eventsList.deaths} title="Deaths" />
        )}
        {!!eventsList?.events?.length && (
          <SortableTable list={eventsList.events} title="Events" />
        )}
        {!!eventsList?.holidays?.length && (
          <SortableTable
            list={eventsList.holidays}
            title="Holidays"
            disableYear
          />
        )}
      </Stack>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress data-testid="wiki-events-loader" />
      </Backdrop>
      {hasError && <ErrorModal />}
    </Box>
  );
}
