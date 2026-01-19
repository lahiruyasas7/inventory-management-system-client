"use client";
import { useGetUsersQuery } from "@/state/api";
import React from "react";
import Header from "../(components)/Header";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Product Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
];

function Users() {
  const { data: users, isError, isLoading } = useGetUsersQuery();

  if (isLoading) return <div className="py-4">Loading...</div>;

  if (isLoading || !users) {
    <div className="text-center text-red-500 py-4">Failed to fetch users</div>;
  }
  return (
    <div className="flex flex-col">
      <Header name="Users" />
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.userId}
        checkboxSelection
        className="bg-white shadow"
      />
    </div>
  );
}

export default Users;
