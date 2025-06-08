"use client";
import React, { PropsWithChildren } from "react";
import CustomCursor from "./CustomCursor";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();
const DependenciesInjection = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" />
      {children}
      <CustomCursor />
    </QueryClientProvider>
  );
};

export default DependenciesInjection;
