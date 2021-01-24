import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {FooterComponent} from './home/footer/footer.component';
import {NavigationBarComponent} from './home/navigation-bar/navigation-bar.component';
import {SchedulerComponent} from './home/scheduler/scheduler.component';
import {SchedulerHeaderComponent} from './home/scheduler/scheduler-header/scheduler-header.component';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {AppRoutingModule} from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ContextMenuModule} from 'ngx-contextmenu';
import {ToastComponent} from './home/toast/toast.component';
import {ToastService} from './home/services/toast.service';
import {HttpService} from './home/services/http.service';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavigationBarComponent,
    SchedulerComponent,
    SchedulerHeaderComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
    AppRoutingModule,
    NgbModule,
    ContextMenuModule.forRoot(),
    HttpClientModule
  ],
  providers: [ToastService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
