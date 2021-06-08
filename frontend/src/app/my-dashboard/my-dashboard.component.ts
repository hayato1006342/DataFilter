import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import { ActivatedRoute , ParamMap } from '@angular/router';
import { ClientService} from '../service/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode'
import Swal from 'sweetalert2';


@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent implements OnInit {

  token: any;
  id_environment : number;
  data: number;
  deviceInfo : any;
  form : FormGroup;
  edit : any;

  constructor(
    private fb: FormBuilder,
    private routes : ActivatedRoute,
    private client: ClientService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.token = jwt_decode(localStorage.getItem('token'));
    
    this.form = this.fb.group({
      failure : [''],
      diagnosis : [''],
      solution : ['']
    })

    this.routes.paramMap
    .subscribe((params : ParamMap) => {
    let id = + params.get('id');
    this.id_environment = id;
  });
  this.show(); 
  }

  show(){
    let data = ({
      status : 2,
      environment : this.id_environment,
      user: this.token.id
    });
    this.client.postRequest(`${environment.BASE_API_REGISTER}/show/device/progress/my_dashboard`,data).subscribe(
      (Response : any) => {
        if(Response){
          this.data = Response;
        }else{
          this.data = 0;
        }
      },(error) => {
        this.data = 0;
      }
    )
  }

  moreInfo(id: number){
    let data = ({
      environment : this.id_environment,
      id_device: id
    });
    this.client.postRequest(`${environment.BASE_API_REGISTER}/show/device/progress/moreinfo`,data).subscribe(
      (Response : any) => {
        this.deviceInfo = Response;
      },(error) => {
        console.log(error);
      }
    )
  }

  
  bringData(id : number){
    let data = ({
      environment : this.id_environment,
      id_device: id
    });
    this.client.postRequest(`${environment.BASE_API_REGISTER}/show/device/repair`,data).subscribe(
      (Response : any) => {
        this.edit = Response[0].id;
        this.form.setValue({
          failure : Response[0].failure,
          diagnosis : Response[0].diagnosis,
          solution : Response[0].solution
        })
      },(error) => {
        console.error(error);
      }
    )
  }

  updateData(id : number){
    if(this.form.valid){
      let data = ({
        environment : this.id_environment,
        id_device: id,
        failure: this.form.value.failure,
        diagnosis: this.form.value.diagnosis,
        solution: this.form.value.solution
      });
      this.client.postRequest(`${environment.BASE_API_REGISTER}/set/device/add`, data).subscribe(
        (Response : any) => {
          console.log(Response);
          this.toastr.success("Los cambios fueron exitosos")
        },(error) => {
          console.error(error);
        }
      )
    }else{
      this.toastr.warning("Todos los campos deben contener información");
    }
  }

  
  StatusChange(id: number, status: number){
    let data = ({
      environment : this.id_environment,
      id_device: id,
      status : status
    });
    console.log(data);
    this.client.postRequest(`${environment.BASE_API_REGISTER}/check/device/status`, data).subscribe(
      (Response : any) => {
        if(Response.status == 'error3'){
          this.toastr.warning("Para pasar el dispositivo ha finalizado deben estar completos los datos de falla, diagnóstico y solución");
        }
        if(Response.status == 'error4'){
          this.toastr.warning("Aunque el dispositivo no se puede reparar, tiene que llenar los campos falla y diagnóstico");
        }
        if(Response.status == 3){
          this.toastr.success('El dispositivo se paso a finalizado');
        }
      },(error) => {
        console.error(error);
      }
    )
  }

}
