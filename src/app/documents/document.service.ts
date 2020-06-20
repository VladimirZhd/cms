import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentChangeEvent = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documents: Document[] = [];
  maxDocumentId: number;

  constructor(private http: HttpClient) {
  }

  storeDocuments() {
    let documentsText = JSON.parse(JSON.stringify(this.documents));
    const headers = new HttpHeaders({ 'Content-type': 'application/json' });
    this.http.put('https://cms-wdd430-b3029.firebaseio.com/documents.json', documentsText, { headers: headers }).subscribe(
      () => {
        this.documentChangeEvent.next(this.documents.slice());
      }
    )
  }

  getDocuments(): Document[] {
    this.http.get('https://cms-wdd430-b3029.firebaseio.com/documents.json').subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        this.documentChangeEvent.next(this.documents.slice());
      }
    )
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
    this.storeDocuments();
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
    this.storeDocuments();
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
    this.storeDocuments();
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
