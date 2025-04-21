"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BranchTable from "@/components/BranchTable";
import ProductTable from "@/components/ProductTable";
import { useBreadcrumb } from "@/context/BreadcrumbContext";

type Branch = {
  id: number;
  name: string;
  address: string;
  city: string;
  items: number;
};

type Company = {
  id: number;
  name: string;
  address: string;
  branches: number;
  branchFile: string | null;
};

type Product = {
  id: number;
  name: string;
  description: string;
  inventory: number;
  branch: string;
  image: string;
};

export default function ChangeSerialNumber() {
  const { setBreadcrumb } = useBreadcrumb();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [branches, setBranches] = useState<Branch[] | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);

  // Fetch companies data on mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("/data/companies.json");
        if (!response.ok) {
          throw new Error("Failed to fetch companies data");
        }
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  // Update breadcrumb when selectedCompany changes
  useEffect(() => {
    setBreadcrumb(
      selectedCompany ? `Companies -> ${selectedCompany.name}` : "Companies"
    );
  }, [selectedCompany, setBreadcrumb]);

  // Function to handle company click and dynamically load branches
  const handleCompanyClick = async (
    branchFile: string | null,
    company: Company
  ) => {
    if (!branchFile) {
      // Stay on company page if no branchFile is provided
      window.location.href = "/change-serial-number";
      return;
    }

    try {
      const response = await fetch(`/data/${branchFile}`);
      if (!response.ok) {
        throw new Error("Failed to fetch branch data");
      }
      const branchData = await response.json();
      setBranches(branchData);
      setSelectedCompany(company); // Set the selected company
    } catch (error) {
      console.error("Failed to load branch data:", error);
      // Redirect to the homepage if fetching fails
      window.location.href = "/";
    }
  };

  // Function to handle branch click and dynamically load products
  const handleBranchClick = async (productFile: string | null) => {
    if (!productFile) {
      console.error("No product file provided for this branch.");
      return;
    }

    console.log(`Fetching products from: /data/${productFile}`);

    try {
      const response = await fetch(`/data/${productFile}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products data");
      }
      const productData = await response.json();
      console.log("Fetched products:", productData);
      setProducts(productData);
    } catch (error) {
      console.error("Failed to load products data:", error);
    }
  };

  // Function to go back up the tree
  const handleBack = () => {
    if (products) {
      setProducts(null); // Go back to branches
    } else if (branches) {
      setBranches(null); // Go back to companies
      setSelectedCompany(null);
    }
  };

  return (
    <main className="m-4">
      {products ? (
        <>
          <button
            onClick={handleBack}
            className="mb-2 px-2 py-1 text-xs bg-stone-500 text-white border border-stone-500 rounded hover:bg-black-500 hover:text-white transition cursor-pointer"
          >
            Back
          </button>
          <ProductTable products={products.slice(0, 30)} /> {/* Limit to 30 items */}
        </>
      ) : branches ? (
        <>
          <button
            onClick={handleBack}
            className="mb-2 px-2 py-1 text-xs bg-stone-500 text-white border border-stone-500 rounded hover:bg-black-500 hover:text-white transition cursor-pointer"
          >
            Back
          </button>
          <BranchTable branches={branches} onBranchClick={handleBranchClick} />
        </>
      ) : companies.length > 0 ? (
        <Table>
          <TableCaption>A list of your companies.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead># of Branches</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company) => (
              <TableRow
                key={company.id}
                onClick={() => handleCompanyClick(company.branchFile, company)}
                className="cursor-pointer"
              >
                <TableCell>{company.id}</TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.address}</TableCell>
                <TableCell>{company.branches}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>Loading companies...</p>
      )}
    </main>
  );