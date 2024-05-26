"use client";
import React, { useEffect, useRef } from "react";

import { Provider as ReduxProvider } from "react-redux";

import type { AppStore } from "@/libs/store";
import { makeStore } from "@/libs/store";
import { theme } from "@/libs/theme";
import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { setupListeners } from "@reduxjs/toolkit/query";

const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current != null) {
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);

  return (
    <ReduxProvider store={storeRef.current}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>,
      </LocalizationProvider>
    </ReduxProvider>
  );
};

export default Provider;
