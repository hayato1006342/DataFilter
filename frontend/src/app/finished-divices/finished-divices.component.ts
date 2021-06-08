import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute , ParamMap } from '@angular/router';
import { ClientService} from '../service/client.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-finished-divices',
  templateUrl: './finished-divices.component.html',
  styleUrls: ['./finished-divices.component.css']
})
export class FinishedDivicesComponent implements OnInit {

  id_environment : number;
  data : any;
  more: any;

  constructor(
    private routes : ActivatedRoute,
    private client: ClientService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.routes.paramMap
    .subscribe((params : ParamMap) => {
    let id = + params.get('id');
    this.id_environment = id;
    });
    this.show()
  }

  search(data : string){
    console.log(data);
  }
  
  moreInfo(id : number){
    let data = ({
      environment : this.id_environment,
      id_device: id
    });
    this.client.postRequest(`${environment.BASE_API_REGISTER}/show/device/progress/moreinfo`,data).subscribe(
      (Response : any) => {
        this.more = Response;
      },(error) => {
        console.error(error);
      }
    )
  }

  show(){
    let data = ({
      status : 3,
      environment : this.id_environment
    })
    this.client.postRequest(`${environment.BASE_API_REGISTER}/show/device/finished`,data).subscribe(
      (Response : any) => {
        if(Response){
          this.data = Response;
        }else{
          this.data = 0;
        }
      },(error) => {
        this.data = 0;
      }
    )
  }

  removeDevice(id : number){
    let data = ({
      id_device : id,
      status : 4,
      environment : this.id_environment
    });
    this.client.postRequest(`${environment.BASE_API_REGISTER}/device/remove`,data).subscribe(
      (Response : any) => {
        console.log(Response);
      },(error) => {
        console.error(error);
      }
    )
  }
}
