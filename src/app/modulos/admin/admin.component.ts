import { Component, OnInit } from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {

  isAdmin: any;
  greeting: string = '';
  currentDate: string = '';
  currentTime: string = '';

  ngOnInit(): void {
    this.setGreeting();
    this.startClock();
  }

  setGreeting(): void {
    const currentHour = new Date().getHours();

    if (currentHour >= 0 && currentHour < 12) {
      this.greeting = 'BOM DIA';
    } else if (currentHour >= 12 && currentHour < 18) {
      this.greeting = 'Boa tarde';
    } else {
      this.greeting = 'Boa noite';
    }
  }

  startClock(): void {
    const clock$ = interval(1000).pipe(
      map(() => new Date())
    );

    clock$.subscribe(currentTime => {
      this.currentDate = this.formatDate(currentTime);
      this.currentTime = this.formatTime(currentTime);
    });
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }

  formatTime(time: Date): string {
    return time.toLocaleTimeString();
  }

}
