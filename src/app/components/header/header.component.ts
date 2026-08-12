import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [DatePipe, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  companyName: string = 'РУМТИБЕТ';
  showCounter: boolean = false;
  clickCount: number = 0;
  isCounterVisible: boolean = false;
  isLoading: boolean = true;

  currentDateTime: Date = new Date();
  private timerId: any;

  public navigationMenu = [
    { label: 'Главная', route: '/' },
    { label: 'Пользователи', route: '/users' },
  ];

  ngOnInit() {
    this.timerId = setInterval(() => {
      this.currentDateTime = new Date();
    }, 1000);

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  toggleTimerCounter(): void {
    this.showCounter = !this.showCounter;
  }

  increaseClicks(): void {
    this.clickCount++;
  }

  decreaseClicks(): void {
    if (this.clickCount > 0) {
      this.clickCount--;
    }
  }
}
