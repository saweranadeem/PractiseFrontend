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
        const response = await axios.get(`${api.API_URL}/cpt`);
        setSearchTable(response.cpts);
      } catch (err) {
        setError("Failed to fetch cpts");
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
        await axios.delete(`${api.API_URL}/cpt/${id}`);
        setSearchTable(searchTable.filter((clinic) => clinic._id !== id));
      } catch (error) {
        alert("Failed to delete clinic");
      }
    }
  };


  // Navigate to Clinic Update Page
  const handleUpdate = (id) => {
    navigate(`/cpt-edit/${id}`);
  };

  // Define columns
  const columns = [
    { name: "CPT Code", selector: (row) => row.cptCode, sortable: true },
    { name: "Code Type", selector: (row) => row.codeType, sortable: true },
    { name: "Units", selector: (row) => row.defaultUnits, sortable: true },
    { name: "Modifiers", selector: (row) => row.defaultModifier, sortable: true },
    { name: "Fee", selector: (row) => row.feeSchedule, sortable: true },
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
        <h2 className="text-2xl font-bold">Clinic List</h2>
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
