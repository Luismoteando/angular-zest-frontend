import {Injectable} from '@angular/core';
import {Session} from '../models/session.model';
import {Observable} from 'rxjs';
import {HttpService} from './http.service';
import {AppEndpoints} from '../../../app-endpoints';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private httpService: HttpService) {
  }

  readAll(): Observable<Session[]> {
    return this.httpService.get(AppEndpoints.SESSIONS);
  }

  create(session: Session): Observable<Session> {
    return this.httpService.post(AppEndpoints.SESSIONS, session);
  }
}
