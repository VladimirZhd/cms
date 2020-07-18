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
    this.http.get<{ message: string, contacts: Contact[] }>('http://localhost:3000/contacts').subscribe(
      (responseData) => {
        this.contacts = responseData.contacts;
        this.contacts.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        this.contactChangeEvent.next(this.contacts.slice());
      }
    )
    return this.contacts.slice();
  }

  getContact(id: string) {
    // let contact: Contact;
    // console.log(id);
    // this.http.get<{ message: string, contact: Contact }>('http://localhost:3000/contacts' + id).subscribe(
    //   (res) => {
    //     contact = res.contact;
    //     console.log(res.contact);
    //   }
    // )
    // return contact;
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

    const pos = this.contacts.findIndex(c => c.id === contact.id);
    if (pos < 0) {
      return;
    }

    this.http.delete('http://localhost:3000/contacts/' + contact.id).subscribe(
      () => {
        this.contacts.splice(pos, 1);
        this.contacts.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        this.contactChangeEvent.next(this.contacts.slice());
      }
    )
  }

  addContact(newContact: Contact) {
    if (newContact == undefined || newContact == null) {
      return;
    }

    newContact.id = "";

    const headers = new HttpHeaders({ 'Content-type': 'application/json' });

    this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts', newContact, { headers: headers }).subscribe(
      (responseData) => {
        this.contacts.push(responseData.contact);
        this.contacts.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        this.contactChangeEvent.next(this.contacts.slice());
      }
    )
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (originalContact == undefined || originalContact == null || newContact == undefined || newContact == null) {
      return;
    }

    let pos = this.contacts.findIndex(c => c.id === originalContact.id);

    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;

    const headers = new HttpHeaders({ 'Content-type': 'application/json' });

    this.http.put("http://localhost:3000/contacts/" + originalContact.id, newContact, { headers: headers }).subscribe(
      () => {
        this.contacts[pos] = newContact;
        this.contacts.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        this.contactChangeEvent.next(this.contacts.slice());
      }
    )
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
