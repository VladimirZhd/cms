import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentChangeEvent = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documents: Document[];
  maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    for (let document of this.documents) {
      if (document.id == id) {
        return document;
      }
    }
    return null;
  }

  deleteDocument(document: Document) {
    if (document === null) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    this.documentChangeEvent.next(this.documents.slice());
  }

  addDocument(newDocument: Document) {
    if (newDocument == undefined || newDocument == null) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    let documentsListClone = this.documents.slice();
    this.documentChangeEvent.next(documentsListClone);
  }

  updateDocument(originalDoc: Document, newDoc: Document) {
    if (originalDoc == undefined || originalDoc == null || newDoc == undefined || newDoc == null) {
      return;
    }

    let pos = this.documents.indexOf(originalDoc);

    if (pos < 0) {
      return;
    }

    newDoc.id = originalDoc.id;
    this.documents[pos] = newDoc;
    const documentsListClone = this.documents.slice();
    this.documentChangeEvent.next(documentsListClone);
  }

  getMaxId() {
    let maxId: number = 0;

    for (let document of this.documents) {
      let currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    console.log(maxId)
    return maxId;
  }


}
