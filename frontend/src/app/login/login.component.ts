import { Component, OnInit } from '@angular/core';
import { ClientService} from '../service/client.service';
import {environment} from '../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../service/auth.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form : FormGroup;
  spinner : boolean = true;

  constructor(
    private fb: FormBuilder, 
    private route: Router,
    private client: ClientService,
    private toastr: ToastrService,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

  onSubmit(){
    this.spinner = false;
    if(this.form.valid){
      let data = {
        email : this.form.value.email,
        password : this.form.value.password
      }
      this.client.postRequest(`${environment.BASE_API_REGISTER}/login`, data).subscribe(
        (response : any) => {
          console.log(response);
          if (response.activated != 0){
            this.auth.login(response.token);
            this.auth.setNameUser(response.name);
            this.auth.setSurnameUser(response.surname);
            this.auth.setImg(response.img);
            this.spinner = true;
            this.route.navigate( ['/environments']);
          }else{
            this.toastr.warning('La cuenta no está activa',)
            this.spinner = true;
          }
        },(error) => {
          this.toastr.error('Los datos son incorrectos','Error')
          this.spinner = true;
        }
      )
    }else{
      this.toastr.error('Rellene los campos','Error')
      this.spinner = true;
    }
  }

}
