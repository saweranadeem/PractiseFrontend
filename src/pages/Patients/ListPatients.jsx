import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "../../config";

const ListPatients = () => {
  const [searchTable, setSearchTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const navigate = useNavigate();

  // Fetch Data
  const fetchData = async () => {
    try {
      const response = await axios.get(`${api.API_URL}/patient`);
      setSearchTable(response.patients);
      setFilteredData(response.patients);
    } catch (err) {
      setError("Failed to fetch patients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${api.API_URL}/patient/${id}`);
        const updatedData = searchTable.filter((patient) => patient._id !== id);
        setSearchTable(updatedData);
        setFilteredData(updatedData);
      } catch (error) {
        alert("Failed to delete user");
      }
    }
  };

  // Navigate to Details
  const handleUpdate = (id) => {
    navigate(`/patient-edit/${id}`);
  };

  // Define columns for the table
  const columns = [
    { name: "First Name", selector: (row) => row.fname, sortable: true },
    { name: "Last Name", selector: (row) => row.lname, sortable: true },
    {
      name: "Date of Birth",
      selector: (row) => row.dob,
      sortable: true,
      format: (row) => new Date(row.dob).toLocaleDateString("en-US"),
    },
    {
      name: "Home Address",
      selector: (row) => `${row.street}, ${row.city}, ${row.state}, ${row.zip}`,
      sortable: false,
    },
    { name: "Phone Number", selector: (row) => row.phone, sortable: false },
    {
      name: "Insurance Providers",
      selector: (row) => {
        if (!row.insurance) return "N/A";
        return Object.values(row.insurance)
          .map((ins) => ins.primary_insurance_provider)
          .join(", ");
      },
      sortable: false,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            onClick={() => handleUpdate(row._id)}
            className="btn btn-primary"
          >
            U
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="btn btn-danger"
          >
            D
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // Handle Search
  useEffect(() => {
    const filtered = searchTable.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [search, searchTable]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  // alert(JSON.stringify(filteredData));
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* {JSON.stringify(filteredData)} */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Patients List</h2>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-lg"
        />
      </div>

      <div className="bg-white p-4 rounded-lg shadow mt-4">
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          paginationPerPage={perPage}
          paginationRowsPerPageOptions={[5, 10, 20, 50]}
          onChangePage={setPage}
          onChangeRowsPerPage={setPerPage}
          highlightOnHover
          striped
          responsive
        />
      </div>
    </div>
  );
};

export default ListPatients;
