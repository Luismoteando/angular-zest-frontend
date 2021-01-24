import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CalendarView} from 'angular-calendar';

@Component({
  selector: 'app-scheduler-header',
  templateUrl: './scheduler-header.component.html',
  styleUrls: ['./scheduler-header.component.css']
})
export class SchedulerHeaderComponent {

  @Input() view: CalendarView;

  @Input() viewDate: Date;

  @Input() locale = 'en';

  @Output() viewChange = new EventEmitter<CalendarView>();

  @Output() viewDateChange = new EventEmitter<Date>();

  CalendarView = CalendarView;
}
