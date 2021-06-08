import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , ParamMap } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ClientService} from '../service/client.service';
import {environment} from '../../environments/environment';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  form : FormGroup
  ids
  spinner : boolean = true;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private routes : ActivatedRoute,
    private client: ClientService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.routes.paramMap
      .subscribe((params : ParamMap) => {
      let id = + params.get('id');
      this.ids = id;
      this.recoverPassword();
    });

    this.form = this.fb.group({
      password: ['', Validators.compose([Validators.required,Validators.minLength(8), Validators.maxLength(15), this.noWhitespaceValidator])],
      validatepassword: ['', Validators.compose([Validators.required,Validators.minLength(8), Validators.maxLength(15), this.noWhitespaceValidator])],
    });
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  recoverPassword(){
    let id = this.ids;
    this.client.getRequestId(`${environment.BASE_API_REGISTER}/recover/pass/`+ id).subscribe(
      (response : any) => {
        console.log(response);
        if(response.codestatus == true){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Código válido',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'El código ha expirado',
            showConfirmButton: false,
            timer: 1500
          })
          this.route.navigate(['/'])
        }
      },(error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Este código no es válido',
          showConfirmButton: false,
          timer: 1500
        })
        this.route.navigate(['/'])
      }
    )
  }

  onSubmit(){
    this.spinner = true;
    if(this.form.value.password == this.form.value.validatepassword){
      if(this.form.valid){
        let data = ({
          password : this.form.value.password,
          validatepassword : this.form.value.validatepassword,
          code : this.ids
        });
        this.client.postRequest(`${environment.BASE_API_REGISTER}/recover/modification`, data).subscribe(
          (response : any) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'contraseña restablecida',
              showConfirmButton: false,
              timer: 1500
            })
            this.route.navigate(['/login']);
          },(error) => {
            console.log(error);
          }
        )
      }else{
        this.toastr.warning('Las contraseñas no cumplen con los requisitos establecidos');
        this.spinner = true;
      }
    }else{
      this.toastr.error('Las contraseñas no coinciden');
      this.spinner = true;
    }
  }

  get password(){return this.form.get('password')};
  get validatepassword(){return this.form.get('validatepassword')};

}
