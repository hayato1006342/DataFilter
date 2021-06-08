import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';
import { ClientService} from '../service/client.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-codeclient',
  templateUrl: './codeclient.component.html',
  styleUrls: ['./codeclient.component.css']
})
export class CodeclientComponent implements OnInit {

  form : FormGroup;
  data : any;

  constructor(
    private fb: FormBuilder, 
    private route: Router,
    private client: ClientService,
    private toastr: ToastrService,
  ) { }

  spinner: boolean = true;
  ngOnInit(): void {
    this.form = this.fb.group({
      identification : ['',Validators.required]
    });
    this.data = 0;
  }

  consult(){
    if(this.form.valid){
      let data = ({
        identification : this.form.value.identification
      })
      this.client.postRequest(`${environment.BASE_API_REGISTER}/verification/client`, data).subscribe(
        (Response : any) => {
          this.data = Response;
        },(error) => {
          this.data = 0;
          this.toastr.warning("Su documento de identidad no se encuentra registrado en nuestro sistema");
        }
      )
    }else{
      this.toastr.error("Ingrese su documento");
    }
  }

}
