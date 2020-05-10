import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.module';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  selectedContact: Contact;
  constructor() { }

  ngOnInit(): void {
  }



}
