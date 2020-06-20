import { Component, OnInit, OnDestroy, NgModule } from "@angular/core";
import { Subscription } from 'rxjs';

import { Contact } from "../contact.model";
import { ContactService } from '../contact.service';

@Component({
  selector: "cms-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.css"],
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  private subscription: Subscription;
  term: string;

  constructor(private contactService: ContactService) {
    this.contacts = contactService.getContacts();
  }

  ngOnInit(): void {
    this.subscription = this.contactService.contactChangeEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    )
  }

  onKeyPress(value: string) {
    this.term = value;
  }

  search(value: string) {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
