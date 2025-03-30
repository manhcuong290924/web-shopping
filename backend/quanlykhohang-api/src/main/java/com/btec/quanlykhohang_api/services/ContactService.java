// src/main/java/com/btec/quanlykhohang_api/services/ContactService.java
package com.btec.quanlykhohang_api.services;

import com.btec.quanlykhohang_api.entities.Contact;
import com.btec.quanlykhohang_api.repositories.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    // Tạo liên hệ mới
    public Contact createContact(Contact contact) {
        // Kiểm tra các trường bắt buộc
        if (contact.getName() == null || contact.getName().trim().isEmpty() ||
                contact.getEmail() == null || contact.getEmail().trim().isEmpty() ||
                contact.getMessage() == null || contact.getMessage().trim().isEmpty()) {
            throw new IllegalArgumentException("Name, email, and message are required.");
        }
        return contactRepository.save(contact);
    }

    // Lấy danh sách tất cả liên hệ
    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    // Lấy liên hệ theo ID
    public Contact getContactById(String id) {
        Optional<Contact> contactOptional = contactRepository.findById(id);
        if (!contactOptional.isPresent()) {
            throw new IllegalArgumentException("Contact not found with id: " + id);
        }
        return contactOptional.get();
    }

    // Cập nhật liên hệ
    public Contact updateContact(String id, Contact updatedContact) {
        Optional<Contact> contactOptional = contactRepository.findById(id);
        if (!contactOptional.isPresent()) {
            throw new IllegalArgumentException("Contact not found with id: " + id);
        }

        Contact contact = contactOptional.get();
        // Cập nhật các trường
        if (updatedContact.getName() != null && !updatedContact.getName().trim().isEmpty()) {
            contact.setName(updatedContact.getName());
        }
        if (updatedContact.getEmail() != null && !updatedContact.getEmail().trim().isEmpty()) {
            contact.setEmail(updatedContact.getEmail());
        }
        if (updatedContact.getTitle() != null) {
            contact.setTitle(updatedContact.getTitle());
        }
        if (updatedContact.getMessage() != null && !updatedContact.getMessage().trim().isEmpty()) {
            contact.setMessage(updatedContact.getMessage());
        }

        return contactRepository.save(contact);
    }

    // Xóa liên hệ
    public void deleteContact(String id) {
        if (!contactRepository.existsById(id)) {
            throw new IllegalArgumentException("Contact not found with id: " + id);
        }
        contactRepository.deleteById(id);
    }

    // Tìm kiếm liên hệ theo name hoặc email
    public List<Contact> searchContacts(String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return getAllContacts();
        }
        return contactRepository.findByNameOrEmail(searchTerm);
    }
}