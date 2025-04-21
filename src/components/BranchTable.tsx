"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

type Branch = {
  id: number;
  name: string;
  address: string;
  city: string;
  items: number;
  productFile: string | null; // Ensure this property exists
};

type BranchTableProps = {
  branches: Branch[];
  onBranchClick: (productFile: string | null) => void;
};

export default function BranchTable({
  branches,
  onBranchClick,
}: BranchTableProps) {
  return (
    <Table>
      <TableCaption>A list of your branches.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>City</TableHead>
          <TableHead># of Items</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {branches.map((branch) => (
          <TableRow
            key={branch.id}
            onClick={() =>
              branch.productFile && onBranchClick(branch.productFile)
            } // Only call onBranchClick if productFile is not null
            className={`cursor-pointer hover:bg-gray-100 ${
              branch.productFile ? "" : "cursor-not-allowed text-gray-400"
            }`} // Disable pointer and style for branches with null productFile
          >
            <TableCell className="font-medium">{branch.id}</TableCell>
            <TableCell>{branch.name}</TableCell>
            <TableCell>{branch.address}</TableCell>
            <TableCell>{branch.city}</TableCell>
            <TableCell>{branch.items}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
