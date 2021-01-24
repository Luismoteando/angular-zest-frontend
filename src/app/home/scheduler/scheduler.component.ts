import {ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {addHours} from 'date-fns';
import {Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  DAYS_OF_WEEK
} from 'angular-calendar';
import {SessionService} from '../services/session.service';

const colors: any = {
  green: {
    primary: '#7b8a8b',
    secondary: '#ecf0f1',
  }
};

@Component({
  selector: 'app-scheduler',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css'],
  providers: [CalendarDateFormatter]
})
export class SchedulerComponent implements OnInit {
  @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  refresh: Subject<any> = new Subject();

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.handleWorkoutSession('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.workoutSessions = this.workoutSessions.filter((iEvent) => iEvent !== event);
        this.handleWorkoutSession('Deleted', event);
      },
    },
  ];

  workoutSessions: CalendarEvent[] = [];

  constructor(
    private modal: NgbModal,
    private sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.sessionService.readAll().subscribe(sessions => {
      sessions.forEach(session => {
        this.workoutSessions.push(
          {
            id: session.id,
            title: session.title,
            start: new Date(session.start),
            end: addHours(new Date(session.start), 2),
            color: colors.green,
            draggable: true,
            resizable: {
              beforeStart: true,
              afterEnd: true
            },
          }
        );
      });
      this.refresh.next();
    });
  }

  workoutSessionTimesChanged({
                               event,
                               newStart,
                               newEnd,
                             }: CalendarEventTimesChangedEvent): void {
    this.workoutSessions = this.workoutSessions.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleWorkoutSession('Dropped or resized', event);
  }

  handleWorkoutSession(action: string, workoutSession: CalendarEvent): void {
    this.modalData = {event: workoutSession, action};
    this.modal.open(this.modalContent, {size: 'lg'});
  }

  addWorkoutSession(date: Date): void {
    this.workoutSessions.push(
      {
        start: date,
        end: addHours(date, 1),
        title: 'New event',
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        }
      }
    );
    this.refresh.next();
  }

  changeDay(date: Date) {
    this.viewDate = date;
    this.view = CalendarView.Day;
  }
}
