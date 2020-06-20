import { Injectable, EventEmitter } from '@angular/core';

import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messageChangeEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];
  maxMessageId: number;

  constructor(private http: HttpClient) {
    this.initMessages();
  }

  initMessages() {
    this.http.get('https://cms-wdd430-b3029.firebaseio.com/messages.json').subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.messageChangeEvent.next(this.messages.slice());
      }
    )
  }

  storeMessages() {
    let messagesText = JSON.parse(JSON.stringify(this.messages));
    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    this.http.put('https://cms-wdd430-b3029.firebaseio.com/messages.json', messagesText, { headers: headers }).subscribe(
      () => {
        this.messageChangeEvent.next(this.messages.slice());
      }
    )
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    for (let message of this.messages) {
      if (message.id == id) {
        return message;
      }
    }
    return null;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangeEvent.emit(this.messages.slice());
    this.storeMessages();
  }

  getMaxId() {
    let maxId: number = 0;

    for (let message of this.messages) {
      let currentId = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    console.log(maxId)
    return maxId;
  }
}
