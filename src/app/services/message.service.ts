import { Injectable } from '@angular/core';
import { MessageType } from '../../enums/message';
import { Message } from '../../interfaces/message.interface';
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: Message[] = [];

  get AllMessages(): Message[] {
    return this.messages;
  }
  addMessage(text: string, type: MessageType): void {
    const id = Date.now();
    const newMessage: Message = {
      id: id,
      text: text,
      type: type,
    };

    this.messages.unshift(newMessage);

    setTimeout(() => {
      this.closeMessage(id);
    }, 500000000000000);
  }
  closeMessage(id: number): void {
    this.messages = this.messages.filter((msg) => msg.id !== id);
  }
}
