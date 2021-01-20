import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {FooterComponent} from './home/footer/footer.component';
import {NavigationBarComponent} from './home/navigation-bar/navigation-bar.component';
import {SchedulerComponent} from './home/scheduler/scheduler.component';
import {SchedulerHeaderComponent} from './home/scheduler-header/scheduler-header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavigationBarComponent,
    SchedulerComponent,
    SchedulerHeaderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
