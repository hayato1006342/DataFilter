import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {DataTablesModule} from 'angular-datatables';

import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { IndexComponent } from './index/index.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { CodeclientComponent } from './codeclient/codeclient.component';
import { WorkEnvironmentsComponent } from './work-environments/work-environments.component';
import { ActivatedEmailComponent } from './activated-email/activated-email.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { PopoverModule } from "ngx-smart-popover";


import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ProfileComponent } from './profile/profile.component';
import { AddUsersEnvironmentComponent } from './add-users-environment/add-users-environment.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { EnvironmentsComponent } from './environments/environments.component';
import { AddDevicesComponent } from './add-devices/add-devices.component';
import { JoinEnvironmentComponent } from './join-environment/join-environment.component';
import { RegisterClientsComponent } from './register-clients/register-clients.component';
import { PendingDevicesComponent } from './pending-devices/pending-devices.component';
import { CustomerHistoryComponent } from './customer-history/customer-history.component';
import { FinishedDivicesComponent } from './finished-divices/finished-divices.component';
import { DevicesInProgressComponent } from './devices-in-progress/devices-in-progress.component';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
import { ConsultClientComponent } from './consult-client/consult-client.component';
import { EnvironmentReportComponent } from './environment-report/environment-report.component';

PdfMakeWrapper.setFonts(pdfFonts);

const config = {
  apiKey: "AIzaSyB8uT6XO_IKVtKBXWoj_oEvhCyvdiev-RY",
  authDomain: "datafilter-32b92.firebaseapp.com",
  projectId: "datafilter-32b92",
  storageBucket: "datafilter-32b92.appspot.com",
  messagingSenderId: "383352454103",
  appId: "1:383352454103:web:3fc646fbf2c15ee948e992",
  measurementId: "G-DGW1G23Y81"
};


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    IndexComponent,
    RegisterComponent,
    LoginComponent,
    RecoveryComponent,
    CodeclientComponent,
    WorkEnvironmentsComponent,
    ActivatedEmailComponent,
    RecoverPasswordComponent,
    ProfileComponent,
    AddUsersEnvironmentComponent,
    AboutUsComponent,
    EnvironmentsComponent,
    AddDevicesComponent,
    JoinEnvironmentComponent,
    RegisterClientsComponent,
    PendingDevicesComponent,
    CustomerHistoryComponent,
    FinishedDivicesComponent,
    DevicesInProgressComponent,
    MyDashboardComponent,
    ConsultClientComponent,
    EnvironmentReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    PopoverModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
