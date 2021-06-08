import { Component, OnInit } from '@angular/core';
import { ClientService} from '../service/client.service';
import {environment} from '../../environments/environment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form : FormGroup;
  spinner:boolean = true;

  constructor(
    private fb: FormBuilder, 
    private route: Router,
    private client: ClientService,
    private toastr: ToastrService) { }


  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.compose([Validators.required,Validators.minLength(3), Validators.maxLength(40), this.noWhitespaceValidator])],
      surname: ['', Validators.compose([Validators.required,Validators.minLength(3), Validators.maxLength(40), this.noWhitespaceValidator])],
      email: ['', Validators.email],
      password: ['', Validators.compose([Validators.required,Validators.minLength(8), Validators.maxLength(15), this.noWhitespaceValidator])],
      validatepassword: ['', Validators.compose([Validators.required,Validators.minLength(8), Validators.maxLength(20), this.noWhitespaceValidator])],
      checkbox : [false, Validators.requiredTrue]
    });
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  async onSubmit(){
    if(this.checkbox.valid){
    
      if (this.form.valid){
        if(this.form.value.password == this.form.value.validatepassword){
          this.spinner = false;
          let data ={
            name: this.form.value.name,
            surname: this.form.value.surname,
            email: this.form.value.email,
            password: this.form.value.password,
            validatepassword: this.form.value.validatepassword
          };
          console.log(data)
          this.client.postRequest(`${environment.BASE_API_REGISTER}/register`, data).subscribe(
            (response: any) =>{
              console.log(response)
              this.toastr.success('Valide su correo electrónico para activar la cuenta');
              this.route.navigate(['/login'])
            },(error) =>{
              this.spinner = true;
              this.toastr.error('El usuario ya existe', 'Lo sentimos');
            }
          )
        }else{
          this.spinner = true;
          this.toastr.error('Las contraseñas no coinciden, por favor inténtelo de nuevo','Error');
        }
      }else{
        this.spinner = true;
        this.toastr.error('Rellene todos los campos','Error');
      }
    }else{
      this.toastr.error("Para completar su registro debe de aceptar los términos y condiciones")
    }
  }

  get name(){return this.form.get('name')};
  get surname(){return this.form.get('surname')};
  get email(){return this.form.get('email')};
  get password(){return this.form.get('password')};
  get validatepassword(){return this.form.get('validatepassword')};
  get checkbox(){return this.form.get('checkbox')};
}
