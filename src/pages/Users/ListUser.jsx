import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "../../config";

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${api.API_URL}/user`);      
      setUsers(response.users);
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${api.API_URL}/user/${id}`);
        setUsers(users.filter((user) => user._id !== id));
      } catch (error) {
        alert("Failed to delete user");
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/users-edit/${id}`);
  };
  
  const columns = [
    { name: "First Name", selector: (row) => row.fname, sortable: true },
    { name: "Last Name", selector: (row) => row.lname, sortable: true },
    { name: "Username", selector: (row) => row.username, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Phone", selector: (row) => row.phone, sortable: true },
    { name: "Role", selector: (row) => row.role, sortable: true },
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
        <h2 className="text-2xl font-bold">Users List</h2>
      </div>
      <div className="bg-white p-4 rounded-lg shadow mt-4">
        <DataTable
          columns={columns}
          data={users}
          pagination
          highlightOnHover
          striped
          responsive
        />
      </div>
    </div>
  );
};

export default ListUser;
