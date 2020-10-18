import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppnavigationComponent } from './components/appnavigation/appnavigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialthemeModule } from './components/materialtheme/materialtheme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './components/register/register.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { VerifyemailComponent } from './components/verifyemail/verifyemail.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { QuillModule } from 'ngx-quill';
import { DiscussionsComponent } from './components/discussions/discussions.component';
import { FiredatePipe } from './pipes/firedate.pipe';
import { DatePipe } from '@angular/common';
import { DiscussionModelComponent } from './components/discussions/discussion-model/discussion-model.component';
import { TaskComponent } from './components/tasks/task/task.component';
import { TasklistComponent } from './components/tasks/tasklist/tasklist.component';
import { TaskModelComponent } from './components/tasks/task-model/task-model.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/daygrid/main';
import { TaskcalendarComponent } from './components/tasks/taskcalendar/taskcalendar.component';
import { KanbanComponent } from './components/tasks/kanban/kanban.component';
import { StatusPipe } from './pipes/status.pipe';
import { TeamComponent } from './components/teams/team/team.component';
import { TeammodComponent } from './components/teams/teammod/teammod.component';
import { UsermodComponent } from './components/teams/usermod/usermod.component';
import { TeamuserPipe } from './pipes/teamuser.pipe';
import { FilesComponent } from './components/file/files/files.component';
import { DrapzoneDirective } from './components/file/drapzone.directive';
import { PaymentComponent } from './components/payments/payment/payment.component';
import { PaymodalComponent } from './components/payments/paymodal/paymodal.component';

FullCalendarModule.registerPlugins([dayGridPlugin,
  interactionPlugin]);
@NgModule({
  declarations: [
    AppComponent,
    AppnavigationComponent,
    DashboardComponent,
    LoginComponent,
    LoginLayoutComponent,
    UserLayoutComponent,
    RegisterComponent,
    VerifyemailComponent,
    ProjectsComponent,
    DiscussionsComponent,
    FiredatePipe,
    DiscussionModelComponent,
    TaskComponent,
    TasklistComponent,
    TaskModelComponent,
    TaskcalendarComponent,
    KanbanComponent,
    StatusPipe,
    TeamComponent,
    TeammodComponent,
    UsermodComponent,
    TeamuserPipe,
    FilesComponent,
    DrapzoneDirective,
    PaymentComponent,
    PaymodalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialthemeModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    QuillModule.forRoot(),
    FullCalendarModule,
  ],
  providers: [DatePipe, FiredatePipe],
  entryComponents: [DiscussionModelComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
