
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, GetDownloadURLPipe } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {environment} from '../../environments/environment';
import { observable, Observable } from 'rxjs';
import { ClientService} from '../service/client.service';
import {AuthService} from '../service/auth.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  boleano: boolean = true;
  boleano3: boolean = true;

  form: FormGroup;
  formPassword: FormGroup;

  urlImage: Observable<string>;
  uploadPercent : Observable<number>;
  token;
  data;
  img;
  loadbutton: boolean = false;

  

  constructor(
    private fb: FormBuilder,
    private client: ClientService,
    private auth: AuthService,
    private route: Router,
    private storage: AngularFireStorage,
    private toastr: ToastrService) { }
  
  

  changePassword(){
    if(this.formPassword.value.password == this.formPassword.value.validatepassword){
      if(this.formPassword.valid){
        let data = ({
          password: this.formPassword.value.password,
          validatepassword: this.formPassword.value.validatepassword,
          id : this.token.id
        });
        console.log(data);
        this.client.postRequest(`${environment.BASE_API_REGISTER}/change_password`,data).subscribe(
          (Response : any) => {
            this.toastr.success("La contraseña se cambió con éxito");
            this.auth.logout();
            window.location.reload();
          },(error) => {
            this.toastr.error('Error inesperado');
          }
        )
      }
    }else{
      this.toastr.warning("Las contraseñas no coinciden, por favor inténtelo de nuevo")
    }
  }

  Rename(){
    if(this.form.valid){
      let data = ({
        name: this.form.value.name,
        surname: this.form.value.surname,
        id: this.token.id
      });
      this.boleano = true;
      this.boleano3 = true;
      this.client.postRequest(`${environment.BASE_API_REGISTER}/edit_name`,data).subscribe(
        (Response : any) => {
          console.log(Response);
          this.auth.setNameUser(Response.name);
          this.auth.setSurnameUser(Response.surname);
          this.bringData();
          this.toastr.success("El nombre se cambió con éxito");
        },(error) =>{
          this.toastr.error("Error inesperado");
        }
      )
    }
  }

  changeImage(e){
    this.img = e.target.files[0];
    this.loadbutton = false;
    if(this.img){
      this.loadbutton = true;
    }
  }


  saveImageDB(arg){
    let data = ({
      img : arg,
      user : this.token.id
    })
    this.client.postRequest(`${environment.BASE_API_REGISTER}/edit_img`,data).subscribe(
      (Response : any) => {
        this.auth.setImg(Response.img);
        this.toastr.success("La foto del perfil se cambió con éxito");
        this.bringData();
        console.log(Response);
      },(error) => {
        console.log(error);
      }
    ) 
  }
  
  uploadImage(){
    if(this.img){
      let imgdata;
      const id = Math.random().toString(36).substring(3);
      const filePath = `profile/profile_${id}`;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.img);
      this.uploadPercent = task.percentageChanges();

      task.snapshotChanges().pipe(finalize(()=> {
        this.urlImage = ref.getDownloadURL();
        ref.getDownloadURL().subscribe((data) => this.saveImageDB(data) );
      })).subscribe();
    
      this.loadbutton = false;
      
    }else{
      this.toastr.warning("Primero, seleccione una imagen")
    }
  }

  bringData(){
    let data = this.token.id;
    this.client.getRequest(`${environment.BASE_API_REGISTER}/editprofile/` + data).subscribe(
      (Response : any ) => {
        this.data = Response;
        this.form.setValue({
          name: this.data[0].name, 
          surname: this.data[0].surname,
          email : this.data[0].email
        });
      },(error) => {
        console.log(error);
      }
    )
  }
  

  ngOnInit(): void {
    this.form = this.fb.group({
      name : [''],
      surname : [''],
      email: ['']
    });

    this.formPassword = this.fb.group({
      password : [''],
      validatepassword: ['']
    })

    if(localStorage.getItem('token')){
      this.token = jwt_decode(localStorage.getItem("token"));
      this.client.getRequest(`${environment.BASE_API_REGISTER}/authorization`,localStorage.getItem('token')).subscribe(
      (response: any) => {
        this.bringData()
      },(error) => {
        console.log(error);
        this.auth.logout();
        this.route.navigate(['/login'])
      });
    }else{
      this.route.navigate(['/login'])
    }
  }

}
