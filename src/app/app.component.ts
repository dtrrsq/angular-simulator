import { Component, OnInit, OnDestroy } from '@angular/core';
import { Colors } from '../enums/color';
import { tourCollection } from '../collection';
import { memberCollection } from '../collection';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [FormsModule, DatePipe],
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

  tourProgram = [
    {
      id: 1,
      label: 'наше предложение',
      title: 'Лучшие программы для тебя',
      description:
        'Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа.',
      buttonText: 'Стоимость программ',

      features: [
        {
          id: 1,
          img: '/images/guide-icon.png',
          title: 'Опытный гид',
          desc: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
        },
        {
          id: 2,
          img: '/images/shield-icon.png',
          title: 'Безопасный поход',
          desc: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
        },
        {
          id: 3,
          img: '/images/price-icon.png',
          title: 'Лояльные цены',
          desc: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
        },
      ],
    },
  ];

  constructor() {
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
    localStorage.setItem('lastVisit', currentDate);
  }

  private saveVisitCount(): void {
    const savedCount = localStorage.getItem('visitCount');

    const currentCount = savedCount ? parseInt(savedCount, 10) : 0;

    const newCount = currentCount + 1;

    localStorage.setItem('visitCount', newCount.toString());
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
}
