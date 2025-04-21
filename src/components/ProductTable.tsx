"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Product = {
  id: number;
  name: string;
  serial: string;
  inventory: number;
  branch: string;
  image: string;
};

type ProductTableProps = {
  products: Product[];
};

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <Table>
      <TableCaption>A list of your products.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Image</TableHead>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Serial Number</TableHead>
          <TableHead className="text-left">Inventory</TableHead>
          <TableHead>Branch</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id} className="h-[80px]">
            <TableCell>
              <img
                src={product.image}
                alt={product.name}
                className="h-16 w-16 object-cover rounded"
              />
            </TableCell>
            <TableCell className="font-medium">{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.serial}</TableCell>
            <TableCell className="text-left">{product.inventory}</TableCell>
            <TableCell>{product.branch}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
