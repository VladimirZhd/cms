import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';


import { Message } from '../message.model';
import { MessagesService } from '../messages.service';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  currentSender: Contact;
  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('msgText') msgTextRef: ElementRef;

  constructor(private messageService: MessagesService, private contactService: ContactService) { }

  ngOnInit(): void {
    this.currentSender = this.contactService.getContact('101');
    console.log(this.currentSender);
  }

  onSendMessage() {
    const newSubject = this.subjectRef.nativeElement.value;
    const newMsgText = this.msgTextRef.nativeElement.value;
    const newMessage = new Message('1', newSubject, newMsgText, this.currentSender);
    this.messageService.addMessage(newMessage);
  }

  onClear() {
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }
}
