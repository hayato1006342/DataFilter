import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {IndexComponent} from './index/index.component'
import {RegisterComponent} from './register/register.component'
import {LoginComponent} from './login/login.component'
import {RecoveryComponent} from './recovery/recovery.component'
import {CodeclientComponent} from './codeclient/codeclient.component'
import {WorkEnvironmentsComponent} from './work-environments/work-environments.component'
import {ActivatedEmailComponent} from './activated-email/activated-email.component'
import {RecoverPasswordComponent} from './recover-password/recover-password.component'
import { ProfileComponent }  from './profile/profile.component'
import {AddUsersEnvironmentComponent} from './add-users-environment/add-users-environment.component'
import {AboutUsComponent} from './about-us/about-us.component'
import {EnvironmentsComponent} from './environments/environments.component'
import {JoinEnvironmentComponent} from './join-environment/join-environment.component'
import {EnvironmentReportComponent} from './environment-report/environment-report.component';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'activated-account/:id', component: ActivatedEmailComponent},
  {path: 'recovery/:id', component: RecoverPasswordComponent},
  {path: 'recovery', component: RecoveryComponent},
  {path: 'consult', component: CodeclientComponent},
  {path: 'environments', component: WorkEnvironmentsComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'environments/users/:id', component: AddUsersEnvironmentComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'environment/:id', component: EnvironmentsComponent},
  {path: 'environment/join/:code',component:JoinEnvironmentComponent},
  {path: 'environments/report',component:EnvironmentReportComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
