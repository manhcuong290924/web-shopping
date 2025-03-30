// src/main/java/com/btec/quanlykhohang_api/controllers/ContactController.java
package com.btec.quanlykhohang_api.controllers;

import com.btec.quanlykhohang_api.entities.Contact;
import com.btec.quanlykhohang_api.services.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    @Autowired
    private ContactService contactService;

    /**
     * Create a new contact message.
     *
     * @param contact The contact object containing name, email, title, and message.
     * @return ResponseEntity with the created contact or error message.
     */
    @PostMapping
    public ResponseEntity<?> createContact(@RequestBody Contact contact) {
        try {
            Contact savedContact = contactService.createContact(contact);
            return new ResponseEntity<>(savedContact, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to create contact: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get all contact messages.
     *
     * @return ResponseEntity with the list of all contacts.
     */
    @GetMapping
    public ResponseEntity<List<Contact>> getAllContacts() {
        List<Contact> contacts = contactService.getAllContacts();
        return new ResponseEntity<>(contacts, HttpStatus.OK);
    }

    /**
     * Get a contact by ID.
     *
     * @param id The ID of the contact to retrieve.
     * @return ResponseEntity with the contact or error message.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getContactById(@PathVariable String id) {
        try {
            Contact contact = contactService.getContactById(id);
            return new ResponseEntity<>(contact, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to retrieve contact: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update a contact by ID.
     *
     * @param id The ID of the contact to update.
     * @param updatedContact The updated contact object.
     * @return ResponseEntity with the updated contact or error message.
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateContact(@PathVariable String id, @RequestBody Contact updatedContact) {
        try {
            Contact contact = contactService.updateContact(id, updatedContact);
            return new ResponseEntity<>(contact, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to update contact: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Delete a contact by ID.
     *
     * @param id The ID of the contact to delete.
     * @return ResponseEntity with success or error message.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteContact(@PathVariable String id) {
        try {
            contactService.deleteContact(id);
            return new ResponseEntity<>("Contact deleted successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete contact: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}