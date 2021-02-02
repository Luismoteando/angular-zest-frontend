import {Component, Input, OnInit} from '@angular/core';
import {Session} from '../models/session.model';
import {SessionService} from '../services/session.service';
import {ToastService} from '../services/toast.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  templateUrl: 'session-edition-dialog.component.html',
  styleUrls: ['session-edition-dialog.component.css']
})

export class SessionEditionDialogComponent implements OnInit {

  @Input() id: string;

  formGroup: FormGroup;

  session: Session = {id: null, title: null, start: null, sessionExerciseIds: []};

  constructor(private sessionService: SessionService,
              private toastService: ToastService,
              public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.sessionService.read(this.id).subscribe(
      session => {
        this.session = session;
        this.initGroupForm();
      }
    );
  }

  updateSession() {
    this.session = this.getGroupFormValues();
    this.sessionService.update(this.session).subscribe(
      () => this.activeModal.close('Dialog closed')
      , () => this.toastService.showError('Oops, something bad happened. There are no exercises with that id.')
      , () => this.toastService.showSuccess('Session updated successfully!')
    );
  }

  private getGroupFormValues(): Session {
    return {
      id: this.id,
      title: this.formGroup.get('title').value,
      start: this.formGroup.get('start').value,
      sessionExerciseIds: this.formGroup.get('sessionExerciseIds').value
    };
  }

  private initGroupForm() {
    this.formGroup = this.formBuilder.group({
      title: new FormControl(this.session.title, Validators.required),
      start: new FormControl({value: this.session.start, disabled: true}, Validators.required),
      sessionExerciseIds: new FormControl(this.session.sessionExerciseIds, Validators.required)
    });
  }
}
