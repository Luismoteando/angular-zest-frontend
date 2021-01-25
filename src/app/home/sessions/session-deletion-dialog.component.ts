import {Component, Input, OnInit} from '@angular/core';
import {Session} from '../models/session.model';
import {SessionService} from '../services/session.service';
import {ToastService} from '../services/toast.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  templateUrl: 'session-deletion-dialog.component.html',
  styleUrls: ['session-deletion-dialog.component.css']
})

export class SessionDeletionDialogComponent implements OnInit {

  @Input() id: string;

  session: Session = {id: null, title: null, start: null, sessionExerciseIds: []};

  constructor(private sessionService: SessionService,
              private toastService: ToastService,
              public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.sessionService.read(this.id).subscribe(
      session => {
        this.session = session;
      }
    );
  }

  deleteSession() {
    this.sessionService.delete(this.session.id).subscribe(
      () => this.activeModal.close('Dialog closed')
      , () => this.toastService.showError('Oops, something bad happened. There are no exercises with that id.')
      , () => this.toastService.showSuccess('Session deleted successfully!')
    );
  }
}
