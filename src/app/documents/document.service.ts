import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Document } from './document.model';
import { stringify } from 'querystring';

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
    // const headers = new HttpHeaders({ 'Content-type': 'application/json' });
    this.http.put('http://localhost:3000/documents', documentsText).subscribe(
      () => {
        this.documentChangeEvent.next(this.documents.slice());
      }
    )
  }

  getDocuments(): Document[] {
    this.http.get<{ message: string, documents: Document[] }>('http://localhost:3000/documents').subscribe(
      (result) => {
        this.documents = result.documents;
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
    if (!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);
    console.log(pos)
    if (pos < 0) {
      return;
    }

    this.http.delete('http://localhost:3000/documents/' + document.id).subscribe(
      (response: Response) => {
        this.documents.splice(pos, 1);
        this.documents.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        this.documentChangeEvent.next(this.documents.slice());
      }
    )
  }

  addDocument(newDocument: Document) {
    if (newDocument == undefined || newDocument == null) {
      return;
    }

    newDocument.id = '';

    const headers = new HttpHeaders({ 'Content-type': 'application/json' });

    this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents', newDocument, { headers: headers }).subscribe(
      (response) => {
        this.documents.push(response.document);
        this.documents.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        this.documentChangeEvent.next(this.documents.slice());
      }
    )
  }

  updateDocument(originalDoc: Document, newDoc: Document) {
    if (!originalDoc || !newDoc) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDoc.id);
    if (pos < 0) {
      return;
    }

    newDoc.id = originalDoc.id;

    const headers = new HttpHeaders({ 'Content-type': 'application/json' });

    this.http.put('http://localhost:3000/documents/' + originalDoc.id,
      newDoc, { headers: headers })
      .subscribe(
        () => {
          this.documents[pos] = newDoc;
          this.documents.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
          this.documentChangeEvent.next(this.documents.slice());
        }
      )
  }
}
