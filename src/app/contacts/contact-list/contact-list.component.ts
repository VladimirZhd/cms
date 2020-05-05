import { Component, OnInit } from "@angular/core";
import { Contact } from "../contact.module";

@Component({
  selector: "cms-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.css"],
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [
    new Contact(
      2,
      "Bro. Thayne",
      "thayneti@byui.edu",
      "208-496-3777",
      "https://lh3.googleusercontent.com/w1alhGG3xgmqIjSWaVgNcfVes8QylWnQiZF3m0sBbtmJZzFmtulP1RiiUlhvJz6ZuMhDEA=s100",
      null
    ),
    new Contact(
      2,
      "Bro. Barzee",
      "barzeer@byui.edu",
      "208-496-3768",
      "https://lh3.googleusercontent.com/b4WwyShXbuMmorJk1U3A5HTMy9K7ULSAfOG6QMtp2_XzWDIznqkgVtwgQC7mrbXTfszn=s100",
      null
    ),
    new Contact(
      2,
      "Bro. Robertson",
      "robertsonb@byui.edu",
      "208-496-3775",
      "https://lh3.googleusercontent.com/oSbu_isVBFgZwdQkEovzELuJnD1NpSruk9y9Z-2bo9GlWhYqYcHxl23gnbVO7trLlINO=s100",
      null
    ),
  ];

  constructor() {}

  ngOnInit(): void {}
}
