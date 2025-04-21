"use client";

import React, { createContext, useContext, useState } from "react";

type BreadcrumbItem = {
  label: string;
  href?: string; // Optional link for clickable breadcrumbs
};

type BreadcrumbContextType = {
  breadcrumb: BreadcrumbItem[];
  setBreadcrumb: (items: BreadcrumbItem[]) => void;
};

// Update the default breadcrumb state to an array
const BreadcrumbContext = React.createContext<BreadcrumbContextType>({
  breadcrumb: [],
  setBreadcrumb: () => {},
});

export const BreadcrumbProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [breadcrumb, setBreadcrumb] = useState<string | null>("Companies");

  return (
    <BreadcrumbContext.Provider value={{ breadcrumb, setBreadcrumb }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = () => {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error("useBreadcrumb must be used within a BreadcrumbProvider");
  }
  return context;
};
