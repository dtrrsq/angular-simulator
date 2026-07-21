import { Component, OnInit, OnDestroy } from '@angular/core';
import { Colors } from '../enums/color';
import { tourCollection } from '../collection';
import { memberCollection } from '../collection';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { MessageService } from './services/message.service';
import { MessageType } from '../enums/message';
import { StorageService } from './services/storage.service';
@Component({
  selector: 'app-root',
  imports: [FormsModule, DatePipe, NgTemplateOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  tourLocation: string = '';
  tourDate: string = '';
  tourMembers: string = '';
  companyName: string = 'РУМТИБЕТ';
  tours = tourCollection;
  members = memberCollection;
  clickCount: number = 0;
  isCounterVisible: boolean = false;
  liveInput: string = '';
  isLoading: boolean = true;
  showCounter: boolean = false;
  MsgTypes = MessageType;

  tourProgram = [
    {
      id: 1,
      label: 'Лучшие программы для тебя',
      title: 'наше предложение',
      description:
        'Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа.',
      buttonText: 'Стоимость программ',

      features: [
        {
          id: 1,
          img: '/images/icons/guide-icon.svg',
          title: 'Опытный гид',
          desc: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
        },
        {
          id: 2,
          img: '/images/icons/shield-icon.svg',
          title: 'Безопасный поход',
          desc: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
        },
        {
          id: 3,
          img: '/images/icons/price-icon.svg',
          title: 'Лояльные цены',
          desc: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
        },
      ],
    },
  ];

  infoCities = [
    {
      id: 1,
      title: 'делимся впечатлениями',
      label: 'Блог о путешествиях',
      buttonText: 'Другие материалы',

      features: [
        {
          id: 101,
          img: '/images/italy-pic.svg',
          title: 'Красивая Италия, какая она в реальности?',
          desc: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
          date: '01/04/2023',
          link: 'читать статью',
        },
        {
          id: 102,
          img: '/images/sky-pic.svg',
          title: 'Долой сомнения! Весь мир открыт для вас!',
          desc: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
          date: '01/04/2023',
          link: 'читать статью',
        },
        {
          id: 103,
          img: '/images/traveler-pic.svg',
          title: 'Как подготовиться к путешествию в одиночку?',
          desc: 'Для современного мира базовый вектор развития предполагает.',
          date: '01/04/2023',
          link: 'читать статью',
        },
        {
          id: 104,
          img: '/images/india-pic.svg',
          title: 'Индия ... летим?',
          desc: 'Для современного мира базовый .',
          date: '01/04/2023',
          link: 'читать статью',
        },
      ],
    },
  ];

  constructor(
    private messageService: MessageService,
    private storageService: StorageService,
  ) {
    this.saveLastVisitDate();
    this.saveVisitCount();
  }

  public isCurrentColor(color: Colors): boolean {
    if (color === Colors.GREEN || color === Colors.BLUE || color === Colors.RED) {
      return true;
    }
    return false;
  }

  private saveLastVisitDate(): void {
    const currentDate = new Date().toLocaleString();

    this.storageService.set<string>('lastVisit', currentDate);
  }

  private saveVisitCount(): void {
    const savedCount = this.storageService.get<number>('visitCount');
    const currentCount = savedCount ? savedCount : 0;
    const newCount = currentCount + 1;

    this.storageService.set<number>('visitCount', newCount);
  }

  currentDateTime: Date = new Date();
  private timerId: any;

  ngOnInit() {
    this.timerId = setInterval(() => {
      this.currentDateTime = new Date();
    }, 1000);

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  ngOnDestroy() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  increaseClicks(): void {
    this.clickCount++;
  }

  decreaseClicks(): void {
    if (this.clickCount > 0) {
      this.clickCount--;
    }
  }

  toggleTimerCounter(): void {
    this.showCounter = !this.showCounter;
  }

  get currentMessages() {
    return this.messageService.AllMessages;
  }

  triggerAlert(text: string, type: MessageType): void {
    this.messageService.addMessage(text, type);
  }

  closeMessageFromHtml(id: number): void {
    this.messageService.closeMessage(id);
  }
}
