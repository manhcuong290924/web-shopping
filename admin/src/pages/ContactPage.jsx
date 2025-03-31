// src/pages/ContactPage.js
import React, { useState, useEffect } from "react";
import { fetchContacts, deleteContact } from "../services/contactService";
import ContactTable from "../components/Contact/ContactTable"; 
import ContactSearch from "../components/Contact/ContactSearch"; 
import MessageModal from "../components/Contact/MessageModal"; 

const ContactPage = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Gọi API khi component được mount
  useEffect(() => {
    const loadContacts = async () => {
      try {
        const data = await fetchContacts();
        setContacts(data);
        setFilteredContacts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadContacts();
  }, []);

  // Hàm xóa liên hệ
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await deleteContact(id);
        const updatedContacts = contacts.filter((contact) => contact.id !== id);
        setContacts(updatedContacts);
        setFilteredContacts(updatedContacts);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Hàm xử lý tìm kiếm
  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredContacts(contacts);
      return;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        contact.email.toLowerCase().includes(lowerCaseSearchTerm) ||
        (contact.title && contact.title.toLowerCase().includes(lowerCaseSearchTerm))
    );
    setFilteredContacts(filtered);
  };

  // Hàm xem nội dung tin nhắn
  const handleViewMessage = (message) => {
    setSelectedMessage(message);
  };

  // Hàm đóng modal tin nhắn
  const handleCloseMessage = () => {
    setSelectedMessage(null);
  };

  if (loading) {
    return <div className="flex-1 p-6 bg-gray-50">Loading...</div>;
  }

  if (error) {
    return <div className="flex-1 p-6 bg-gray-50">Error: {error}</div>;
  }

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Contact Page</h1>
      <ContactSearch onSearch={handleSearch} />
      <ContactTable
        contacts={filteredContacts}
        onDelete={handleDelete}
        onViewMessage={handleViewMessage}
      />
      {selectedMessage && (
        <MessageModal message={selectedMessage} onClose={handleCloseMessage} />
      )}
    </div>
  );
};

export default ContactPage;