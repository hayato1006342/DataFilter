import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../service/auth.service';
import { ClientService} from '../service/client.service';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-clients',
  templateUrl: './register-clients.component.html',
  styleUrls: ['./register-clients.component.css']
})
export class RegisterClientsComponent implements OnInit {

  form : FormGroup

  constructor(
    private fb: FormBuilder,
    private client: ClientService,
    private auth: AuthService,
    private route: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name:[ '', Validators.compose([Validators.pattern('^[A-Za-z-ñÑáéíóúÁÉÍÓÚ ]+$'), Validators.required])],
      surname:['', Validators.compose([Validators.pattern('^[A-Za-z-ñÑáéíóúÁÉÍÓÚ ]+$'),Validators.required])],
      identification:['', Validators.compose([Validators.pattern('^[0-9]+$'),Validators.required])],
      phone: ['', Validators.compose([Validators.pattern('^[0-9]+$'),Validators.required, Validators.maxLength(10),])],
      email: ['', Validators.email],
      address: ['']
    });
  }

  onSubmit(){
    if(this.name.valid && this.surname.valid && this.identification.valid){
      let data = ({
        name : this.form.value.name,
        surname : this.form.value.surname,
        identification : this.form.value.identification,
        email : this.form.value.email,
        phone : this.form.value.phone,
        address: this.form.value.address,
        environment : localStorage.getItem('environment')
      });
      
      this.client.postRequest(`${environment.BASE_API_REGISTER}/environment/main/registerclient`, data).subscribe(
        (Response : any) => {
          console.log(Response);
          this.toastr.success('Se agregó el cliente con éxito');
          this.form.reset();
        },(error) => {
          console.warn(error);
        }
      )
    }else{
      this.toastr.warning('Verifique que los campos obligatorios contengan información');
    }
  }

  get name(){return this.form.get('name')};
  get surname(){return this.form.get('surname')};
  get identification(){return this.form.get('identification')};
  get email(){return this.form.get('email')}
  get phone(){return this.form.get('phone')};
  get address(){return this.form.get('address')};

}
