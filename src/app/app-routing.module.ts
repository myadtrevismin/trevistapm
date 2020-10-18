import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DiscussionsComponent } from './components/discussions/discussions.component';
import { LoginComponent } from './components/login/login.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { RegisterComponent } from './components/register/register.component';
import { TaskComponent } from './components/tasks/task/task.component';
import { VerifyemailComponent } from './components/verifyemail/verifyemail.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AuthGuard} from 'src/app/gaurds/auths/auth.guard';
import { TeamComponent } from './components/teams/team/team.component';
import { FilesComponent } from './components/file/files/files.component';
import { PaymentComponent } from './components/payments/payment/payment.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login', component: LoginLayoutComponent,
    children: [
      {path: '', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'verify-email', component: VerifyemailComponent}
    ]
  },
  { path: 'user', component: UserLayoutComponent, canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'projects', component: ProjectsComponent},
      {path: 'discussions', component: DiscussionsComponent},
      {path: 'tasks', component: TaskComponent},
      {path: 'teams', component: TeamComponent},
      {path: 'files', component: FilesComponent},
      {path: 'payments', component: PaymentComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
