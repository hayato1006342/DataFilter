import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , ParamMap } from '@angular/router';
import {environment} from '../../environments/environment';
import { ClientService} from '../service/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../service/auth.service';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-environments',
  templateUrl: './environments.component.html',
  styleUrls: ['./environments.component.css']
})
export class EnvironmentsComponent implements OnInit {


  id_environment;
  btnregisterdevice : boolean = false;
  btnregisterclient : boolean = false;
  mydashboard : boolean = false;
  btnpending : boolean = false;
  btnprogress : boolean = false;
  btnfinished : boolean = false;
  btnhistory : boolean = false;
  count;
  token;

  date_environment;


  constructor(
    private fb: FormBuilder,
    private routes : ActivatedRoute,
    private client: ClientService,
    private auth: AuthService,
    private route: Router,
    private toastr: ToastrService
  ) { }


  mydashboardv(){
    this.btnprogress = false;
    this.btnhistory = false;
    this.btnfinished = false;
    this.btnpending = false;
    this.btnregisterclient = false;
    this.btnregisterdevice = false;
    this.mydashboard = true;
  }

  registerdevice(){
    this.btnhistory = false;
    this.btnfinished = false;
    this.btnprogress = false;
    this.btnpending = false;
    this.mydashboard = false;
    this.btnregisterclient = false;
    this.btnregisterdevice = true;
  }

  registerclient(){
    this.btnhistory = false;
    this.btnfinished = false;
    this.btnprogress = false;
    this.btnpending = false;
    this.mydashboard = false;
    this.btnregisterdevice = false;
    this.btnregisterclient = true;
  }

  public pendingDevices(){
    this.countDevices();
    this.btnhistory = false;
    this.btnfinished = false;
    this.btnprogress = false;
    this.mydashboard = false;
    this.btnregisterdevice = false;
    this.btnregisterclient = false;
    this.btnpending = true
  }

  progressDevices(){
    this.countDevices();
    this.btnhistory = false;
    this.btnfinished = false;
    this.mydashboard = false;
    this.btnpending = false;
    this.btnregisterdevice = false;
    this.btnregisterclient = false;
    this.btnprogress = true;
  }

  finishedDivices(){
    this.btnhistory = false;
    this.btnprogress = false;
    this.mydashboard = false;
    this.btnpending = false;
    this.btnregisterdevice = false;
    this.btnregisterclient = false;
    this.btnfinished = true;
  }

  
 customerHistory(){
  this.btnfinished = false;
  this.btnprogress = false;
  this.mydashboard = false;
  this.btnpending = false;
  this.btnregisterdevice = false;
  this.btnregisterclient = false;
  this.btnhistory = true;
 }

 countDevices(){
   let data = {
     environment :this.id_environment
   }
   this.client.postRequest(`${environment.BASE_API_REGISTER}/device/count`, data).subscribe(
     (Response : any) => {
       this.count = Response;
     },(error) => {
       console.error(error);
     }
   )
 }
  

  ngOnInit(): void {
    if(localStorage.getItem('token')){

      this.token = jwt_decode(localStorage.getItem('token'));
      this.routes.paramMap
      .subscribe((params : ParamMap) => {
      let id = + params.get('id');
      this.id_environment = id;
      });

      if(localStorage.getItem("token")){
        this.client.getRequest(`${environment.BASE_API_REGISTER}/authorization`,localStorage.getItem('token')).subscribe(
          (response: any) => {
            let data = ({
              environment : this.id_environment,
              id_user : this.token.id
            });
            this.client.postRequest(`${environment.BASE_API_REGISTER}/environment/main`, data).subscribe(
              (Response : any) => {
                if(Response[0].state == 1){
                  this.date_environment = Response;
                  this.countDevices();
                  this.mydashboardv();
                }else{
                  Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'Estás suspendido de este entorno!',
                  })
                  this.route.navigate(['/environments']);
                }
                localStorage.setItem('environment',this.id_environment);
              },(error) => {
                this.toastr.warning("Usted no tiene acceso a este entono de trabajo");
                this.route.navigate(['/environments'])
              }
            )
          },(error) => {
            this.auth.logout();
            this.route.navigate(['/login'])
          });
      }else{
        this.route.navigate(['/login']);
      }
    }else{
      this.route.navigate(['/login']);
    }
  }
}
