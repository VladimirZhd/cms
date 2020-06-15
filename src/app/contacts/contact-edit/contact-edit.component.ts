import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact: Contact;
  originalContact: Contact;
  groupContacts: Contact[];
  editMode: boolean = false;
  hasGroup: boolean = false;


  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        let id = params['id'];

        if (id == undefined || id == null) {
          this.editMode = false;
        }

        this.originalContact = this.contactService.getContact(id);
        if (this.originalContact == null || this.originalContact == undefined) {
          return;
        }

        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));
        if (this.contact.group != null) {
          this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
        }
      }
    )
  }

  onRemoveItem(id: number) {

  }

  onCancel() {
    this.router.navigate(['/contacts'], { relativeTo: this.route });
  }

  onSubmit(form: NgForm) {
    const values = form.value;

    const newContact = new Contact('', values.name, values.email, values.phone, values.url);

    if (this.editMode == true) {
      this.contactService.updateContact(this.originalContact, newContact);
    }
    else {
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['/contacts'], { relativeTo: this.route });
  }

  addToGroup(event) {

  }

}
