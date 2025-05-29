"use client";
import React, { PropsWithChildren } from "react";
import CustomCursor from "./CustomCursor";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const DependenciesInjection = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <CustomCursor />
      
    </QueryClientProvider>
  );
};

export default DependenciesInjection;
