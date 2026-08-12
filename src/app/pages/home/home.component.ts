import { Component } from '@angular/core';
import { Colors } from '../../../enums/color';
import { tourCollection } from '../../../collection';
import { memberCollection } from '../../../collection';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../services/message.service';
import { MessageType } from '../../../enums/message';
import { StorageService } from '../../services/storage.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  tourLocation: string = '';
  tourDate: string = '';
  tourMembers: string = '';
  tours = tourCollection;
  members = memberCollection;
  liveInput: string = '';
  isLoading: boolean = true;
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

  photoReport = [
    {
      id: 1,
      title: 'фото-отчет',
      label: 'Делимся впечатлениями',
      buttonText: 'Наш pinterest',

      pictures: [
        {
          id: 11,
          img: '/images/mountain-balloons.svg',
        },
        { id: 12, img: '/images/map-flashlight.svg' },
        { id: 13, img: '/images/ocean-building.svg' },
        { id: 14, img: '/images/ocean-boats.svg' },
        { id: 15, img: '/images/mountain-girl.svg' },
        { id: 16, img: '/images/map-notes.svg' },
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

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
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

  triggerAlert(text: string, type: MessageType): void {
    if (type === MessageType.SUCCESS) {
      this.messageService.showSuccess(text);
    } else if (type === MessageType.INFO) {
      this.messageService.showInfo(text);
    } else if (type === MessageType.WARN) {
      this.messageService.showWarn(text);
    } else if (type === MessageType.ERROR) {
      this.messageService.showError(text);
    }
  }
}
