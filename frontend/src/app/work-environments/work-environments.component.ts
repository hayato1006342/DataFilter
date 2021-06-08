import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { observable, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ClientService} from '../service/client.service';
import {environment} from '../../environments/environment';
import {AuthService} from '../service/auth.service';
import { Router } from '@angular/router';

import jwt_decode from 'jwt-decode'
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-work-environments',
  templateUrl: './work-environments.component.html',
  styleUrls: ['./work-environments.component.css']
})
export class WorkEnvironmentsComponent implements OnInit {

  token;
  uploadPercent : Observable<number>;
  urlImage: Observable<string>;
  url;
  data;

  form : FormGroup;
  formSearch : FormGroup;

  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private client: ClientService,
    private auth: AuthService,
    private route: Router,
    private toastr: ToastrService
  ) { }

  onUpload(e){
    // console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(3);
    const file = e.target.files[0];
    const filePath = `upload/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    
    task.snapshotChanges().pipe(finalize(()=> {
      this.urlImage = ref.getDownloadURL();
      ref.getDownloadURL().subscribe((data)=> this.url = data);
    })).subscribe();

  };

  toRute(id:number){
    this.route.navigate(['/environments/users/' + id])
  }

  generateCode() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  joinEnvironment(){
    Swal.fire({
      title: 'Ingrese el código ',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      confirmButtonText: 'Unirse',
      showLoaderOnConfirm: true,
      preConfirm: (info) => {
        let data = {
          'key_code': info,
          'id_user' : this.token.id
        }
        return this.client.postRequest(`${environment.BASE_API_REGISTER}/environment/code`, data).subscribe(
          (Response : any) => {
            if(Response.status == 'stError'){
              this.toastr.warning('Ya estás dentro de ese entorno de trabajo');
            }else{
              if(Response.status == 'stError101'){
                this.toastr.error('El entorno de trabajo no existe');
              }else{
                this.toastr.success('Se unió correctamente al entorno de trabajo');
                this.showData();
              }
            }
          },(error) => {
            this.toastr.error('El código no es válido');
            this.joinEnvironment();
          }
          
        )
      }
    });
  }

  removeEnvironment(num:number){
    this.client.postRequest(`${environment.BASE_API_REGISTER}/environment/remove`,num).subscribe(
      (Response : any) => {
        this.showData();
      },(error) => {
        console.error(error);
      }
    )
  }

  showData() {
    let data = {
      id : this.token.id
    };
    this.client.postRequest(`${environment.BASE_API_REGISTER}/environment/show`,data).subscribe(
      (Response : any) => {
        this.data = Response;
      },(error) => {
        this.data = '';
      }
    )
  }

  searchEnvironment(){
    if(this.formSearch.valid){
      let data = {
        search : this.formSearch.value.search,
        id : this.token.id
      }
      this.client.postRequest(`${environment.BASE_API_REGISTER}/environment/search`,data).subscribe(
        (Response : any) => {
          this.data = Response;
        },(error) => {
          this.toastr.warning('No se encontraron datos relacionados con su búsqueda')
        }
      )
    }else{
      this.toastr.warning('Ingrese algún dato para realizar la búsqueda')
    }
  }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.token = jwt_decode(localStorage.getItem('token'));
      
      this.formSearch = this.fb.group({
        search : ['', Validators.required]
      })

      this.form = this.fb.group({
        name : ['', Validators.required],
      });


      this.client.getRequest(`${environment.BASE_API_REGISTER}/authorization`,localStorage.getItem('token')).subscribe(
        (response: any) => {
          this.showData();
        },(error) => {
          this.auth.logout();
          this.route.navigate(['/login'])
        });
    }else{
      this.route.navigate(['/login']);
    }
  }

  async onSubmit(){
    if(this.form.valid){
      let data = {
        name : this.form.value.name,
        img : this.url, 
        key_code : this.generateCode(),
        created_by: this.token.id
      }
      this.client.postRequest(`${environment.BASE_API_REGISTER}/environment/create`, data).subscribe(
        (Response: any) => {
          this.form.reset();
          this.toastr.success('Entorno de trabajo creado con éxito')
          this.showData();
        },(error) => {
          console.error(error);
        }
      )
    }else{
      this.toastr.info('Ingrese un nombre')
    }
  }

}
