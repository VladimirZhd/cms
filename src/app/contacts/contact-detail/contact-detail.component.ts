import { Component, OnInit } from "@angular/core";
import { Contact } from "../contact.module";

@Component({
  selector: "cms-contact-detail",
  templateUrl: "./contact-detail.component.html",
  styleUrls: ["./contact-detail.component.css"],
})
export class ContactDetailComponent implements OnInit {
  contact: Contact;
  constructor() {}

  ngOnInit(): void {}
}
