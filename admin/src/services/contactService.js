// src/services/contactService.js

// Hàm lấy danh sách liên hệ từ API
export const fetchContacts = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/contacts");
      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }
      return await response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  };
  
  // Hàm gửi thông tin liên hệ
  export const sendContact = async (contactData) => {
    try {
      const response = await fetch("http://localhost:8080/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });
      if (!response.ok) {
        throw new Error("Failed to send contact");
      }
      return await response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  };
  
  // Hàm xóa liên hệ
  export const deleteContact = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/contacts/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete contact");
      }
      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  };