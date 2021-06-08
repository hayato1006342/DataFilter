import { Component, OnInit } from '@angular/core';
import { ClientService} from '../service/client.service';
import {environment} from '../../environments/environment';
import {AuthService} from '../service/auth.service';
import { ActivatedRoute , ParamMap } from '@angular/router';
import { Router } from '@angular/router';

import jwt_decode from 'jwt-decode'
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-join-environment',
  templateUrl: './join-environment.component.html',
  styleUrls: ['./join-environment.component.css']
})
export class JoinEnvironmentComponent implements OnInit {

  token;
  key_code;

  constructor(
    private auth: AuthService,
    private route: Router,
    private toastr: ToastrService,
    private routes : ActivatedRoute,
    private client: ClientService,
  ) { }


  joinEnvironment(){
    let data = ({
      key_code: this.key_code,
      id_user: this.token.id
    });

    this.client.postRequest(`${environment.BASE_API_REGISTER}/environment/code`, data).subscribe(
      (Response : any) => {
        if(Response.status == 'stError'){
          Swal.fire('Ya estás dentro de ese entorno de trabajo')
          this.route.navigate(['/environments'])
        }else{
          if(Response.status == 'stError101'){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'El entono de trabajo no existe',
            })
          }else{
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Se unió correctamente al entorno de trabajo',
              showConfirmButton: false,
              timer: 2500
            })
            this.route.navigate(['/environments'])
          }
        }
      },(error) => {
        this.toastr.error('El código no es válido');
        this.joinEnvironment();
      });
    }

  ngOnInit(): void {
    this.routes.paramMap
    .subscribe((params : ParamMap) => {
    let code = params.get('code');
    this.key_code = code;
    });

    if(localStorage.getItem("token")){

      this.token = jwt_decode(localStorage.getItem('token'));

      this.client.getRequest(`${environment.BASE_API_REGISTER}/authorization`,localStorage.getItem('token')).subscribe(
        (response: any) => {
          this.joinEnvironment();
        },(error) => {
          this.auth.logout();
          this.route.navigate(['/login']);
        });
    }else{
      Swal.fire('Para que se pueda unir al entorno de trabajo, primero debe de iniciar sesión')
      this.route.navigate(['/login']);
    }
  }

}
