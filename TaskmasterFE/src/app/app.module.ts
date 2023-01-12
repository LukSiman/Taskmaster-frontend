import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DayTasksComponent } from './components/day-tasks/day-tasks.component';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TaskBoxComponent } from './components/task-box/task-box.component';

const routes: Routes = [
  { path: 'main', component: DayTasksComponent },
  { path: 'calendar', component: CalendarComponent },
  // { path: 'insights', component: ProjectPageComponent },
  // { path: 'settings', component: ProjectPageComponent },
  { path: '', component: DayTasksComponent },
  { path: '**', component: DayTasksComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    DayTasksComponent,
    CalendarComponent,
    TaskBoxComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NavbarComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
