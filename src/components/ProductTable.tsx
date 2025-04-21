import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
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
  id: string;
  name: string;
  serial: string;
  inventory: number;
  branch: string;
  image: string;
};

export default function ProductTable({ products }: { products: Product[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [editingSerial, setEditingSerial] = useState<string | null>(null);
  const [editedSerials, setEditedSerials] = useState<{ [id: string]: string }>(
    {}
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const lowerCaseQuery = query.toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredProducts(filtered);
  };

  const handleEditClick = (id: string, currentSerial: string) => {
    setEditingSerial(id);
    setEditedSerials((prev) => ({
      ...prev,
      [id]: currentSerial,
    }));
  };

  const handleSerialChange = (id: string, newSerial: string) => {
    setEditedSerials((prev) => ({
      ...prev,
      [id]: newSerial,
    }));
  };

  const handleSave = (id: string) => {
    console.log(`Saving serial number for product ${id}:`, editedSerials[id]);
    setEditingSerial(null); // Exit edit mode
  };

  const handleCancel = () => {
    setEditingSerial(null); // Exit edit mode without saving
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <Table>
        <TableCaption>Product List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Serial</TableHead>
            <TableHead>Inventory</TableHead>
            <TableHead>Branch</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-16 w-16 object-cover rounded"
                />
              </TableCell>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                {editingSerial === product.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editedSerials[product.id] || ""}
                      onChange={(e) =>
                        handleSerialChange(product.id, e.target.value)
                      }
                      className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <button
                      onClick={() => handleSave(product.id)}
                      className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-2 py-1 text-xs bg-gray-300 text-black rounded hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>{product.serial}</span>
                    <FaEdit
                      onClick={() =>
                        handleEditClick(product.id, product.serial)
                      }
                      className="cursor-pointer text-gray-500 hover:text-gray-700"
                    />
                  </div>
                )}
              </TableCell>
              <TableCell>{product.inventory}</TableCell>
              <TableCell>{product.branch}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
