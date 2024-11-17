import React, { useState, useEffect } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiX,
  FiChevronUp,
  FiChevronDown,
  FiUsers,
} from "react-icons/fi";

const ContactManagement = () => {
  // State management
  const [contacts, setContacts] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    company: "",
    jobTitle: "",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState("firstName");
  const [order, setOrder] = useState("asc");
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  // Form handling
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      company: "",
      jobTitle: "",
    });
    setEditingContact(null);
  };

  // CRUD Operations
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingContact) {
        await fetch(`/api/contacts/${editingContact._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        setAlert({
          show: true,
          message: "Contact updated successfully!",
          type: "success",
        });
      } else {
        await fetch("/api/contacts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        setAlert({
          show: true,
          message: "Contact added successfully!",
          type: "success",
        });
      }
      fetchContacts();
      setOpenForm(false);
      resetForm();
    } catch (error) {
      setAlert({ show: true, message: "Error saving contact!", type: "error" });
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setFormData(contact);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await fetch(`/api/contacts/${id}`, { method: "DELETE" });
        fetchContacts();
        setAlert({
          show: true,
          message: "Contact deleted successfully!",
          type: "success",
        });
      } catch (error) {
        setAlert({
          show: true,
          message: "Error deleting contact!",
          type: "error",
        });
      }
    }
  };

  // Table handling
  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Data fetching
  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/contacts");
      const data = await response.json();

      // Update state with the data from the API
      setContacts(data.contacts || []);
      setTotalPages(data.totalPages || 0);
      setTotalRecords(data.total || 0);
    } catch (error) {
      setAlert({
        show: true,
        message: "Error fetching contacts!",
        type: "error",
      });
      // Set empty states in case of error
      setContacts([]);
      setTotalPages(0);
      setTotalRecords(0);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Sort function with proper error handling
  const sortContacts = (contactsToSort) => {
    if (!Array.isArray(contactsToSort)) return [];

    return [...contactsToSort].sort((a, b) => {
      if (!a || !b) return 0;
      const aValue = (a[orderBy] || "").toString().toLowerCase();
      const bValue = (b[orderBy] || "").toString().toLowerCase();
      return order === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  };

  // Get current page's contacts
  const getCurrentPageContacts = () => {
    const sortedContacts = sortContacts(contacts);
    const startIndex = page * rowsPerPage;
    return sortedContacts.slice(startIndex, startIndex + rowsPerPage);
  };
  // Empty state component
  const EmptyState = () => (
    <div className="text-center py-16 px-4">
      <div className="flex justify-center mb-4">
        <div className="bg-blue-100 p-4 rounded-full">
          <FiUsers className="w-12 h-12 text-blue-500" />
        </div>
      </div>
      <h3 className="text-[1.8rem] font-semibold text-gray-900 mb-2">
        No Contacts Yet
      </h3>
      <p className="text-[1.4rem] text-gray-500 mb-6 max-w-md mx-auto">
        Get started by adding your first contact. Click the "Add Contact" button
        above to create a new contact.
      </p>
      <button
        onClick={() => setOpenForm(true)}
        className="inline-flex items-center gap-2 text-[1.4rem] px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        <FiPlus className="w-5 h-5" />
        Add Your First Contact
      </button>
    </div>
  );

  return (
    <div className="p-6 mx-auto h-[100vh]">
      <div className="bg-white rounded-lg shadow-lg mb-6">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-[2rem] font-bold text-black">
              Contact Management
            </h1>
            <button
              onClick={() => setOpenForm(true)}
              className="flex items-center gap-2 text-[1.4rem] px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors rounded-[0.5rem]"
            >
              <FiPlus className="w-6 h-6" />
              Add Contact
            </button>
          </div>

          {alert.show && (
            <div
              className={`mb-4 p-4 rounded ${
                alert.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              } flex justify-between items-center`}
            >
              <span>{alert.message}</span>
              <button
                onClick={() => setAlert({ ...alert, show: false })}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="overflow-x-auto">
            {contacts.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "First Name",
                        "Last Name",
                        "Email",
                        "Phone Number",
                        "Company",
                        "Job Title",
                        "Actions",
                      ].map((header) => (
                        <th
                          key={header}
                          className="px-6 py-3 text-left text-[1.2rem] font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header !== "Actions" ? (
                            <button
                              className="flex items-center gap-1"
                              onClick={() =>
                                handleSort(
                                  header.toLowerCase().replace(" ", "")
                                )
                              }
                            >
                              {header}
                              {orderBy ===
                                header.toLowerCase().replace(" ", "") &&
                                (order === "asc" ? (
                                  <FiChevronUp className="w-4 h-4" />
                                ) : (
                                  <FiChevronDown className="w-4 h-4" />
                                ))}
                            </button>
                          ) : (
                            header
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getCurrentPageContacts().map((contact) => (
                      <tr
                        key={contact._id}
                        className="hover:bg-gray-50 text-[1.6rem] text-black"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          {contact.firstName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {contact.lastName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {contact.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {contact.phoneNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {contact.company}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {contact.jobTitle}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(contact)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <FiEdit2 className="w-10 h-10" />
                            </button>
                            <button
                              onClick={() => handleDelete(contact._id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <FiTrash2 className="w-10 h-10" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="text-[1.2rem] px-6 py-3 flex items-center justify-between border-t border-gray-200">
                  <div className="flex items-center">
                    <select
                      value={rowsPerPage}
                      onChange={handleChangeRowsPerPage}
                      className="border rounded px-2 py-1"
                    >
                      {[5, 10, 25].map((n) => (
                        <option key={n} value={n}>
                          {n} per page
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleChangePage(page - 1)}
                      disabled={page === 0}
                      className="text-[1.4rem] text-black px-3 py-1 border rounded disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => handleChangePage(page + 1)}
                      disabled={
                        page >=
                        Math.ceil((contacts?.length || 0) / rowsPerPage) - 1
                      }
                      className="text-[1.4rem] text-black px-3 py-1 border rounded disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {openForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[1.6rem] font-bold">
                {editingContact ? "Edit Contact" : "Add New Contact"}
              </h2>
              <button
                onClick={() => {
                  setOpenForm(false);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "firstName", label: "First Name", type: "text" },
                  { name: "lastName", label: "Last Name", type: "text" },
                  { name: "email", label: "Email", type: "email" },
                  { name: "phoneNumber", label: "Phone Number", type: "tel" },
                  { name: "company", label: "Company", type: "text" },
                  { name: "jobTitle", label: "Job Title", type: "text" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-[1.6rem] font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      required
                      className="text-[1.4rem] w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
              <div className=" mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setOpenForm(false);
                    resetForm();
                  }}
                  className="text-[1.6rem] text-black px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-[1.6rem] px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {editingContact ? "Update" : "Add"} Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactManagement;
