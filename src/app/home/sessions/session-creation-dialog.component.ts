import {Component, Input, OnInit} from '@angular/core';
import {Session} from '../models/session.model';
import {SessionService} from '../services/session.service';
import {ToastService} from '../services/toast.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  templateUrl: 'session-creation-dialog.component.html',
  styleUrls: ['session-creation-dialog.component.css']
})

export class SessionCreationDialogComponent implements OnInit {

  @Input() start: Date;

  formGroup: FormGroup;

  newSession: Session = {id: null, title: null, start: null, sessionExerciseIds: []};

  constructor(private sessionService: SessionService,
              private toastService: ToastService,
              public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initGroupForm();
  }

  createSession() {
    this.newSession = this.getGroupFormValues();
    this.sessionService.create(this.newSession).subscribe(
      () => this.activeModal.close('Dialog closed')
      , () => this.toastService.showError('Oops, something bad happened. There are no exercises with that id.')
      , () => this.toastService.showSuccess('Session created successfully!')
    );
  }

  private getGroupFormValues(): Session {
    return {
      id: null,
      title: this.formGroup.get('title').value,
      start: this.formGroup.get('start').value,
      sessionExerciseIds: this.formGroup.get('sessionExerciseIds').value.split(',')
    };
  }

  private initGroupForm() {
    this.formGroup = this.formBuilder.group({
      title: new FormControl(null, Validators.required),
      start: new FormControl({value: this.start, disabled: true}, Validators.required),
      sessionExerciseIds: new FormControl(null, Validators.required)
    });
  }
}
