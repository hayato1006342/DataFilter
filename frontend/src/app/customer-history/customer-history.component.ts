import { Component, OnInit, ViewChild  } from '@angular/core';
import { ClientService} from '../service/client.service';
import { ActivatedRoute , ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-history',
  templateUrl: './customer-history.component.html',
  styleUrls: ['./customer-history.component.css']
})
export class CustomerHistoryComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  data : any = [];
  dtOptions : DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  form : FormGroup;

  
  constructor(
    private client: ClientService,
    private route: Router,
    private routes : ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { 
    this.routes.paramMap
    .subscribe((params : ParamMap) => {
    let id = + params.get('id');
    this.id_environment = id;
    });
    this.bringClients();
  }

  boleano: boolean = false;
  id_environment : number;
  history : any;
  infodeviceData : any;

  
  ngOnInit(): void {
    this.dataTablesInit();
    this.form = this.fb.group({
      'name': [''],
      'surname' : [''],
      'identification':[''],
      'email' : [''],
      'phone' : [''],
      'address' : ['']
    })
   }
  

  dataTablesInit(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      responsive: true,
      // processing: true,
      // serverSide: true,
      language: {
        processing: "Procesando...",
        search: "Buscar:",
        lengthMenu: "Mostrar _MENU_ &eacute;l&eacute;ments",
        info: "Mostrando desde _START_ al _END_ de _TOTAL_ elementos",
        infoEmpty: "Mostrando ningún elemento.",
        infoFiltered: "(filtrado _MAX_ elementos total)",
        infoPostFix: "",
        loadingRecords: "Cargando registros...",
        zeroRecords: "No se encontraron registros",
        emptyTable: "No hay datos disponibles en la tabla",
        paginate: {
          first: "Primero",
          previous: "Anterior",
          next: "Siguiente",
          last: "Último"
        },
        aria: {
          sortAscending: ": Activar para ordenar la tabla en orden ascendente",
          sortDescending: ": Activar para ordenar la tabla en orden descendente"
        }
      }
    };
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  bringClients(){
    let data = ({
      enviroment : this.id_environment
    });
    this.client.postRequest(`${environment.BASE_API_REGISTER}/show/client`, data).subscribe(
      (Response : any) => {
        this.data = Response;
        this.dtTrigger.next();
      },(error) => {
        console.error(error);
      }
    )
  }


  getClients(id : string){
    let data = ({
      enviroment : this.id_environment,
      identification : id
    });
    console.log(data);
    this.client.postRequest(`${environment.BASE_API_REGISTER}/search/client`,data).subscribe(
      (Response : any) => {
        console.log(Response);
        this.form.setValue({
          'name': Response[0].name,
          'surname' : Response[0].surname,
          'identification': Response[0].identification,
          'email' : Response[0].email,
          'phone' : Response[0].phone,
          'address' : Response[0].address
        });
      },(error) => {
        console.error(error);
      }
    )
  } 

  render(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destruimos la tabla
      dtInstance.destroy();
      // dtTrigger la reconstruye
      this.bringClients();
    });}

  updateClient(){
    if(this.form.value.name != ''){
      if(this.form.value.surname != ''){
        let data = ({
          enviroment : this.id_environment,
          name: this.form.value.name,
          surname : this.form.value.surname,
          identification: this.form.value.identification,
          email : this.form.value.email,
          phone : this.form.value.phone,
          address : this.form.value.address
        });
        this.client.postRequest(`${environment.BASE_API_REGISTER}/edit/client`,data).subscribe(
          (Response : any) => {
            this.boleano=false;
            this.toastr.success('Cliente actualizado');
            this.render();
          },(error) => {  
            console.error(error);
          }
        )
      }
    }
  }

  deleteClient(id : string){
    let data = ({
      enviroment : this.id_environment,
      identification : id
    });
    Swal.fire({
      title: 'Está seguro de eliminar este cliente?',
      showCancelButton: true,
      confirmButtonText: `Si`,
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.client.postRequest(`${environment.BASE_API_REGISTER}/delete/client`, data).subscribe(
          (Response : any) => {
            Swal.fire('El cliente fue eliminado', '', 'success');
            this.render();
          },(error) => {
            console.log(error);
          }
        )
      }
    })
  }

  clientDevices(id : string){
    let data = ({
      enviroment : this.id_environment,
      identification : id
    });
    this.client.postRequest(`${environment.BASE_API_REGISTER}/history/client`, data).subscribe(
      (Response : any) => {
        this.history = Response;
      },(error) => {
        this.history = 0;
      }
    )
  }

  InfoDevice(id: string){
    let data = ({
      enviroment : this.id_environment,
      id : id
    });
    this.client.postRequest(`${environment.BASE_API_REGISTER}/client/info/device`, data).subscribe(
      (Response : any) => {
        console.log(Response);
        this.infodeviceData = Response;
      },(error) => {
        console.error(error);
      }
    )
  
  }

}
