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

type Branch = {
  id: number;
  name: string;
  address: string;
  city: string;
  items: number;
  productFile: string | null;
};

type Company = {
  id: number;
  name: string;
  address: string;
  branches: number;
  branchFile: string | null;
};

type Product = {
  id: string;
  name: string;
  description: string;
  serial: string;
  inventory: number;
  branch: string;
  image: string;
};

export default function ChangeSerialNumber() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [branches, setBranches] = useState<Branch[] | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query

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

  // Function to handle company click and dynamically load branches
  const handleCompanyClick = async (
    branchFile: string | null,
    company: Company
  ) => {
    if (!branchFile) {
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
      setSelectedCompany(company);
    } catch (error) {
      console.error("Failed to load branch data:", error);
      window.location.href = "/";
    }
  };

  // Function to handle branch click and dynamically load products
  const handleBranchClick = async (productFile: string | null) => {
    if (!productFile) {
      console.error("No product file provided for this branch.");
      return;
    }

    try {
      const response = await fetch(`/data/${productFile}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products data");
      }
      const productData = await response.json();
      setProducts(productData);
    } catch (error) {
      console.error("Failed to load products data:", error);
    }
  };

  // Function to go back up the tree
  const handleBack = () => {
    if (products) {
      setProducts(null);
    } else if (branches) {
      setBranches(null);
      setSelectedCompany(null);
    }
  };

  // Filter data based on the search query
  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBranches = branches?.filter((branch) =>
    branch.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="m-4">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {products ? (
        <>
          <button
            onClick={handleBack}
            className="mb-2 px-2 py-1 text-xs bg-stone-500 text-white border border-stone-500 rounded hover:bg-black-500 hover:text-white transition cursor-pointer"
          >
            Back
          </button>
          <ProductTable products={filteredProducts?.slice(0, 30) || []} />
        </>
      ) : branches ? (
        <>
          <button
            onClick={handleBack}
            className="mb-2 px-2 py-1 text-xs bg-stone-500 text-white border border-stone-500 rounded hover:bg-black-500 hover:text-white transition cursor-pointer"
          >
            Back
          </button>
          <BranchTable
            branches={filteredBranches || []}
            onBranchClick={handleBranchClick}
          />
        </>
      ) : filteredCompanies.length > 0 ? (
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
            {filteredCompanies.map((company) => (
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
}
