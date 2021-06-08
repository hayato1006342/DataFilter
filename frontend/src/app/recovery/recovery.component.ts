import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {ClientService} from '../service/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {

  form : FormGroup;
  spinner : boolean = true;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private client: ClientService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email : ['', Validators.email]
    })
  }

  onSubmit(){
    this.spinner = false;
    if(this.form.valid){
      let data = {
        email : this.form.value.email
      }
      this.client.postRequest(`${environment.BASE_API_REGISTER}/recover`, data).subscribe(
        (response : any ) => {
          Swal.fire(
            'Recuperación exitosa!',
            'Le hemos enviado un correo para que pueda realizar la recuperación de su contraseña, si no ve el correo en la bandeja principal por favor revise la capeta de SPAM, gracias.',
            'success'
          )
          this.spinner = true;
        },(error) => {
          this.toastr.warning("El correo que intenta recuperar, no está registrado")
          this.spinner = true;
        }
      )
    }else{
      this.toastr.error("Ingrese un correo válido")
      this.spinner = true;
    }
  }

}
