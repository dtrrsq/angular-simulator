import { Component } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { MessageService } from '../../services/message.service';
import { MessageType } from '../../../enums/message';

@Component({
  selector: 'app-message',
  imports: [CommonModule, NgTemplateOutlet],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  constructor(private messageService: MessageService) {}

  get currentMessages() {
    return this.messageService.AllMessages;
  }

  closeMessageFromHtml(id: number): void {
    this.messageService.closeMessage(id);
  }
}
