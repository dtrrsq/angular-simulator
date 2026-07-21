import { MessageType } from '../enums/message';

export interface Message {
  id: number;
  text: string;
  type: MessageType;
}
