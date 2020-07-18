import { Injectable, EventEmitter } from '@angular/core';

import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messageChangeEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];
  maxMessageId: number;

  constructor(private http: HttpClient) {
  }


  getMessages() {
    this.http.get<{ msg: string, messages: Message[] }>('http://localhost:3000/messages').subscribe(
      (response) => {
        this.messages = response.messages;
        this.messageChangeEvent.next(this.messages.slice());
      }
    );
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
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post('http://localhost:3000/messages', message, { headers: headers }).subscribe(
      (response) => {
        this.messages.push(message);
        this.messageChangeEvent.emit(this.messages.slice());
      }
    )
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
