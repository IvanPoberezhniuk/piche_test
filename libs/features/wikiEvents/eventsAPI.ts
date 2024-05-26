import { Dayjs } from "dayjs";

import { Language } from "@/types/wiki";

export type getNewsByDateType = {
  date: Dayjs;
  language: string;
};

export const getNewsByDate = async ({
  date,
  language = Language.English,
}: getNewsByDateType) => {
  const day = date.date();
  const month = date.format("MM");
  const url = `https://api.wikimedia.org/feed/v1/wikipedia/${language}/onthisday/all/${month}/${day}`;
  const response = await fetch(url);
  return response.json();
};
