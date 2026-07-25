import { Injectable } from '@angular/core';
import { MessageType } from '../../enums/message';
import { Message } from '../../interfaces/message.interface';
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: Message[] = [];

  get AllMessages(): ReadonlyArray<Message> {
    return this.messages;
  }
  private addMessage(text: string, type: MessageType): void {
    const id = Date.now();
    const newMessage: Message = {
      id: id,
      text: text,
      type: type,
    };

    this.messages.unshift(newMessage);

    setTimeout(() => {
      this.closeMessage(id);
    }, 5000);
  }
  showSuccess(text: string): void {
    this.addMessage(text, MessageType.SUCCESS);
  }
  showInfo(text: string): void {
    this.addMessage(text, MessageType.INFO);
  }

  showWarn(text: string): void {
    this.addMessage(text, MessageType.WARN);
  }

  showError(text: string): void {
    this.addMessage(text, MessageType.ERROR);
  }

  closeMessage(id: number): void {
    this.messages = this.messages.filter((msg) => msg.id !== id);
  }
}
