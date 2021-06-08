import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute , ParamMap } from '@angular/router';
import {environment} from '../../environments/environment';
import { ClientService} from '../service/client.service';


import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-users-environment',
  templateUrl: './add-users-environment.component.html',
  styleUrls: ['./add-users-environment.component.css']
})
export class AddUsersEnvironmentComponent implements OnInit {

  constructor(
    private route: Router,
    private routes : ActivatedRoute,
    private fb: FormBuilder,
    private client: ClientService,
    private toastr: ToastrService
  ) { }

  id;
  data;
  token;
  form;
  
  userStatus(state:number,id:number){
    let data = ({
      id: id,
      state: state
    });
    this.client.postRequest(`${environment.BASE_API_REGISTER}/environment/manage/status`,data).subscribe(
      (Response : any) => {
        this.showUsers(this.id);
        this.toastr.success("Se actualizó el estado");
      },(error) => {
        console.log(error);
        this.toastr.error("Error inesperado");
      }
    )

  }

  update(){
    this.showUsers(this.id);
  }

  showUsers(id : number){
    this.client.getRequestId(`${environment.BASE_API_REGISTER}/environment/manage/` + id).subscribe(
      (Response : any) => {
        this.data = Response;
      },(error) => {
        console.log(error);
      }
    )
  }

  removeUser(id:number){
    let data = {
      'id' : id
    }
    this.client.postRequest(`${environment.BASE_API_REGISTER}/environment/manage/remove`, data).subscribe(
      (Response : any) => {
        this.showUsers(this.id);
      },(error) =>{
        console.log(error);
      }
    );
  }

  search(){
    if(this.form.valid){
      let data = {
        search : this.form.value.search,
        id_environment : this.id
      }
      this.client.postRequest(`${environment.BASE_API_REGISTER}/environment/manage/search`, data).subscribe(
        (Response : any) => {
          this.data = Response
        },(error) => {
          this.toastr.warning('No se encontraron resultados')
        }
      )
    }
  }

   async inviteCollaborators(){
    const  { value: formValues } = await Swal.fire({
      title: 'Invitar colaboradores',
      html:
        '<input id="swal-input1" type="email" class="swal2-input" autocomplete="off"  placeholder="Ingrese correo">' +
        '<input id="swal-input2" type="email"  class="swal2-input" autocomplete="off" placeholder="Ingrese correo">' +
        '<input id="swal-input3" type="email"  class="swal2-input" autocomplete="off" placeholder="Ingrese correo">',
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Enviar',
      preConfirm: () => {
        return [
          (<HTMLInputElement>document.getElementById('swal-input1')).value,
          (<HTMLInputElement>document.getElementById('swal-input2')).value,
          (<HTMLInputElement>document.getElementById('swal-input3')).value,
        ]
      }
    })
    
    if (formValues) {
      let data = {
        users : formValues,
        environment: this.id,
        owner : this.token.id
      }
      this.client.postRequest(`${environment.BASE_API_REGISTER}/environment/manage/send`, data).subscribe(
        (Response : any) => {
          if(Response.status == 100){
            this.toastr.error("El correo ingresado no se encuentra registrado")
          }else{
            this.toastr.success(Response.users,"Correos enviados a:");
          }
        },(error) => {
          this.toastr.warning("Ingrese un correo")
          this.inviteCollaborators();
        });
    }
  }
  

  ngOnInit(): void {
    this.token = jwt_decode(localStorage.getItem('token'));

    this.routes.paramMap
    .subscribe((params : ParamMap) => {
    let id = + params.get('id');
    this.id = id;
    this.showUsers(id);
    });
    this.form = this.fb.group({
      search : ['', Validators.required]
    })
    
    
  }

}
