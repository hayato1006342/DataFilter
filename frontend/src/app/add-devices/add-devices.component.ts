import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , ParamMap } from '@angular/router';
import {environment} from '../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService} from '../service/client.service';
import {AuthService} from '../service/auth.service';
import { Router } from '@angular/router';
import { EnvironmentsComponent } from '../environments/environments.component'

import { ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-devices',
  templateUrl: './add-devices.component.html',
  styleUrls: ['./add-devices.component.css']
})
export class AddDevicesComponent implements OnInit {

  formConsult : FormGroup;
  formDevice : FormGroup;
  token;
  btnnext:boolean = false;
  clientdata;

  constructor(
    private fb: FormBuilder,
    private routes : ActivatedRoute,
    private client: ClientService,
    private auth: AuthService,
    private route: Router,
    private toastr: ToastrService,
    private env: EnvironmentsComponent
  ) { }

  btnCancel(){
    this.clientdata = '';
    this.btnnext = false;
    this.formConsult.reset();
    this.formDevice.reset();
  }

  ngOnInit(): void {
    this.token = jwt_decode(localStorage.getItem('token'));

    this.formConsult = this.fb.group({
      consult : ["", Validators.compose([Validators.required,Validators.pattern('^[0-9]+$')])]
    });

    this.formDevice = this.fb.group({
      device: ['', Validators.compose([Validators.required])],
      model : [''],
      brand : [''],
      serial : [''],
      accessories : [''],
      condition : [''],
      work_to_do : ['']
    });

  }

  onSubmit(){
    if(this.formConsult.valid){
      let data = ({
        consult: this.formConsult.value.consult,
        id_user: this.token.id,
        environment : localStorage.getItem("environment")
      });
      this.client.postRequest(`${environment.BASE_API_REGISTER}/environment/main/consultclient`,data).subscribe(
        (Response : any) => {
          this.clientdata = Response;
          this.btnnext = true;
        },(error) => {
          this.toastr.info('No se encuentra a ningún cliente con el documento ingresado');
        }
      )
    }else{
      this.toastr.warning('Ingrese el documento del cliente');
    }
  }

  OnSubmitDevice(){
    if(this.formDevice.valid){
      let data = ({
        device: this.formDevice.value.device,
        model : this.formDevice.value.model,
        brand : this.formDevice.value.brand,
        serial : this.formDevice.value.serial,
        accessories : this.formDevice.value.accessories,
        condition : this.formDevice.value.condition,
        work_to_do : this.formDevice.value.work_to_do,
        client : this.formConsult.value.consult,
        user : this.token.id,
        environment: localStorage.getItem('environment')
      });
          this.client.postRequest(`${environment.BASE_API_REGISTER}/create/device`, data).subscribe(
            (Response : any) => {
              this.env.pendingDevices();
              this.env.countDevices();
              this.toastr.success('Fue exitoso el ingreso del dispositivo');
            },(error) => {
              console.warn(error);
            }
          )
    }else{
      console.error("Error no deseado")
    }
  }

  get consult(){return this.formConsult.get('consult')}
  get device(){return this.formDevice.get('device')}

}
