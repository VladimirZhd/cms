import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactChangeEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();
  contacts: Contact[] = [];
  contactMaxId: number;

  constructor(private http: HttpClient) {
  }

  storeContacts() {
    let contactsText = JSON.parse(JSON.stringify(this.contacts));
    const headers = new HttpHeaders({ 'Content-type': 'application/json' });
    this.http.put('https://cms-wdd430-b3029.firebaseio.com/contacts.json', contactsText, { headers: headers }).subscribe(
      () => {
        this.contactChangeEvent.next(this.contacts.slice());
      }
    )
  }

  getContacts(): Contact[] {
    this.http.get('https://cms-wdd430-b3029.firebaseio.com/contacts.json').subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
        this.contactMaxId = this.getMaxId();
        this.contacts.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        this.contactChangeEvent.next(this.contacts.slice());
      }
    )
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
    this.storeContacts();
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
    this.storeContacts();
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
    this.storeContacts();
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
