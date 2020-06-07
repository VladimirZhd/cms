import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactChangeEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();
  contacts: Contact[];
  contactMaxId: number;

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.contactMaxId = this.getMaxId();
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    for (let contact of this.contacts) {
      if (contact.id == id) {
        return contact;
      }
    }
    return null;
  }

  deleteContact(contact: Contact) {
    if (contact === null) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    this.contactChangeEvent.next(this.contacts.slice());
  }

  addContact(newContact: Contact) {
    if (newContact == undefined || newContact == null) {
      return;
    }

    this.contactMaxId++;
    newContact.id = this.contactMaxId.toString();
    this.contacts.push(newContact);
    let contactsListClone = this.contacts.slice();
    this.contactChangeEvent.next(contactsListClone);
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (originalContact == undefined || originalContact == null || newContact == undefined || newContact == null) {
      return;
    }

    let pos = this.contacts.indexOf(originalContact);

    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    const contactsListClone = this.contacts.slice();
    this.contactChangeEvent.next(contactsListClone);
  }

  getMaxId() {
    let maxId = 0

    for (let contact of this.contacts) {
      let currentId = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    console.log(maxId)
    return maxId;
  }

}
