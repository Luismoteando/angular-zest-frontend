import {ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {addHours} from 'date-fns';
import {Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarDateFormatter, CalendarEvent, CalendarEventTimesChangedEvent, CalendarView, DAYS_OF_WEEK} from 'angular-calendar';
import {SessionService} from '../services/session.service';
import {SessionCreationDialogComponent} from '../sessions/session-creation-dialog.component';
import {SessionEditionDialogComponent} from '../sessions/session-edition-dialog.component';
import {SessionDeletionDialogComponent} from '../sessions/session-deletion-dialog.component';

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

  @ViewChild('optionsModal', {static: true}) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: { event: CalendarEvent<any> };

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  refresh: Subject<any> = new Subject();

  workoutSessions: CalendarEvent[] = [];

  constructor(
    private modal: NgbModal,
    private sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.fetchSessions();
  }

  fetchSessions() {
    this.workoutSessions = [];
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
  }

  handleWorkoutSession(workoutSession: CalendarEvent): void {
    this.modalData = {event: workoutSession};
    this.modal.open(this.modalContent, {size: 'sm'});
  }

  addSession(date: Date): void {
    const createSessionModal = this.modal.open(SessionCreationDialogComponent);
    createSessionModal.componentInstance.start = date;

    createSessionModal.result.then(() => {
      this.fetchSessions();
    }).catch((error) => {
      console.log(error);
    });
  }

  updateSession(event: CalendarEvent) {
    const editSessionModal = this.modal.open(SessionEditionDialogComponent);
    editSessionModal.componentInstance.id = String(event.id);

    editSessionModal.result.then(() => {
      this.fetchSessions();
    }).catch((error) => {
      console.log(error);
    });
  }

  deleteSession(event: CalendarEvent) {
    const deleteSessionModal = this.modal.open(SessionDeletionDialogComponent);
    deleteSessionModal.componentInstance.id = String(event.id);

    deleteSessionModal.result.then(() => {
      this.fetchSessions();
    }).catch((error) => {
      console.log(error);
    });

    this.refresh.next();
  }

  changeDay(date: Date) {
    this.viewDate = date;
    this.view = CalendarView.Day;
  }
}
