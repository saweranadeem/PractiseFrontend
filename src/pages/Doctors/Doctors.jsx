import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "../../config";

const List = () => {
  const [searchTable, setSearchTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [perPage, setPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api.API_URL}/doctors`);
        setSearchTable(response.doctors);
      } catch (err) {
        setError("Failed to fetch clinics");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this clinic?")) {
      try {
        await axios.delete(`${api.API_URL}/doctors/${id}`);
        setSearchTable(searchTable.filter((clinic) => clinic._id !== id));
      } catch (error) {
        // console.log("error in delete doctor", error);
        alert("Failed to delete doctor");
      }
    }
  };

  // Navigate to Clinic Details
  const handleUpdate = (id) => {
    navigate(`/doctor-edit/${id}`);
  };

  // Define columns
  const columns = [
    { name: "Name", selector: (row) => row.provider_fname, sortable: true },
    { name: "Provider MI", selector: (row) => row.provider_mi, sortable: true },
    { name: "Specialty", selector: (row) => row.specialty, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Phone", selector: (row) => row.phone, sortable: true },
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
    },
  ];

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Doctors List</h2>
      </div>
      <div className="bg-white p-4 rounded-lg shadow mt-4">
        <DataTable
          columns={columns}
          data={searchTable}
          pagination
          paginationPerPage={perPage}
          paginationRowsPerPageOptions={[5, 10, 20, 50]}
          onChangeRowsPerPage={(newPerPage) => setPerPage(newPerPage)}
          highlightOnHover
          striped
          responsive
        />
      </div>
    </div>
  );
};

export default List;
