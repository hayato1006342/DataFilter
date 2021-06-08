import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import { ActivatedRoute , ParamMap } from '@angular/router';
import { ClientService} from '../service/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../service/auth.service';
import { Router } from '@angular/router';
import { EnvironmentsComponent } from '../environments/environments.component'

import { ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pending-devices',
  templateUrl: './pending-devices.component.html',
  styleUrls: ['./pending-devices.component.css']
})
export class PendingDevicesComponent implements OnInit {

  id_environment : number;
  data : any;
  more : any;
  edit_device : number;
  form : FormGroup;
  token;

  constructor(
    private fb: FormBuilder,
    private routes : ActivatedRoute,
    private client: ClientService,
    private auth: AuthService,
    private route: Router,
    private toastr: ToastrService,
    private env: EnvironmentsComponent
  ) { }

  

  
  start_process(id : number){
    let data = ({
      id : id,
      id_user: this.token.id,
      environment : this.env.id_environment,
      status : 2
    });
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡Estás a punto de iniciar el proceso con este dispositivo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Bien!',
          'Ya puedes comenzar a trabajar con el dispositivo.',
          'success'
        )
        this.client.postRequest(`${environment.BASE_API_REGISTER}/status/device`, data).subscribe(
          (Response : any) => {
            this.env.mydashboardv();
            this.env.countDevices();
          },(error) => {
            console.error(error);
          }
        )
      }
    })
 
  }

  edit(){
    if(this.form.valid){
      let data = ({
        id: this.edit_device,
        device : this.form.value.device,
        model : this.form.value.model,
        brand : this.form.value.brand,
        serial : this.form.value.serial,
        accessories : this.form.value.accessories,
        condition : this.form.value.condition,
        work_to_do : this.form.value.work_to_do
      });
      this.client.postRequest(`${environment.BASE_API_REGISTER}/device/edit`,data).subscribe(
        (Response : any) => {
          this.toastr.success('Datos actualizados');
          this.show();
        },(error) => {
          console.error(error);
        }
      )
    }
  }

  getDataEdit(id: number){
    this.edit_device = id;
    this.client.getRequestId(`${environment.BASE_API_REGISTER}/device/edit/` + id).subscribe(
      (Response : any) => {
        this.form.setValue({
          device: Response[0].type,
          model : Response[0].model,
          brand : Response[0].brand,
          serial : Response[0].serial,
          accessories : Response[0].accessories,
          condition : Response[0].conditions,
          work_to_do : Response[0].work_to_do
        });
      },(error) => {
        console.error(error);
      }
    )
  }

  delete(id:number){
    let data = ({
      environment : this.id_environment,
      id_device: id
    });
    this.client.postRequest(`${environment.BASE_API_REGISTER}/delete/device`, data).subscribe(
      (Response : any) => {
        this.show();
        this.env.countDevices();
      },(error) => {
        console.error(error);
      }
    )
  }

  show(){
    let data = ({
      status : 1,
      environment : this.id_environment
    })
    this.client.postRequest(`${environment.BASE_API_REGISTER}/device/pending`,data).subscribe(
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

  
  moreInfo(id : number){
    let data = ({
      environment : this.id_environment,
      id_device: id
    });
    this.client.postRequest(`${environment.BASE_API_REGISTER}/device/info`,data).subscribe(
      (Response : any) => {
        this.more = Response;
      },(error) => {
        console.error(error);
      }
    )
  }
  

  ngOnInit(): void {
    this.token = jwt_decode(localStorage.getItem('token'));
    this.routes.paramMap
    .subscribe((params : ParamMap) => {
    let id = + params.get('id');
    this.id_environment = id;
    });
    this.show();
    this.form = this.fb.group({
      device: [''],
      model : [''],
      brand : [''],
      serial : [''],
      accessories : [''],
      condition : [''],
      work_to_do : ['']
    })
  }

}
