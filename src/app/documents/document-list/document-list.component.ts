import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[];
  private subscription: Subscription;

  constructor(private documentService: DocumentService) {
    this.documents = documentService.getDocuments();
  }

  ngOnInit(): void {
    this.subscription = this.documentService.documentChangeEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
