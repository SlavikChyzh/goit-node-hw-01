const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");

const contactsPath = path.join(__dirname, "/db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    if (data.length > 0) return JSON.parse(data);
    console.log("Contact list is empty");
    return;
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await listContacts();
    const filterContact = data.filter((contact) => contact.id == contactId);
    if (filterContact.length > 0) return filterContact;
    console.log("No contact found for id " + contactId);
    return;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const index = data.findIndex((contact) => contact.id == contactId);
    if (index > -1) {
      const deleteContact = data.splice(index, 1);
      console.log(`Contact ${deleteContact[0].name} deleted successfully`);
      await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
      return;
    }
    console.log("No contact found for id " + contactId);
    return;
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await listContacts();
    const newContact = { id: randomUUID(), name, email, phone };
    data.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    console.table(newContact);
    console.log(console.log(`Contact: ${newContact.name} added successfully`));
    return;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
