"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { useBreadcrumb } from "@/context/BreadcrumbContext";

export default function BreadcrumbHeader() {
  const { breadcrumb } = useBreadcrumb();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumb && (
          <BreadcrumbItem>
            <BreadcrumbPage>{breadcrumb}</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
