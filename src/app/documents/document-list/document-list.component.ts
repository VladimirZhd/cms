import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    new Document(1, "Document 1", "This is document 1", "https://byui.edu", []),
    new Document(2, "Document 2", "This is document 2", "https://byui.edu", []),
    new Document(3, "Document 3", "This is document 3", "https://byui.edu", []),
    new Document(4, "Document 4", "This is document 4", "https://byui.edu", []),
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
