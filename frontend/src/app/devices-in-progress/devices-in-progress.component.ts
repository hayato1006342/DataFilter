import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute , ParamMap } from '@angular/router';
import { ClientService} from '../service/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {environment} from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-devices-in-progress',
  templateUrl: './devices-in-progress.component.html',
  styleUrls: ['./devices-in-progress.component.css']
})
export class DevicesInProgressComponent implements OnInit {

  id_environment : number;
  data : any;
  searchForm : FormGroup;
  noresults : number;
  more : any;

  constructor(
    private fb: FormBuilder,
    private routes : ActivatedRoute,
    private client: ClientService,
    private toastr: ToastrService,
  ) { }


  search(search:string){
    if(this.data != 0){
      this.noresults = null;
      let searchArr : any[] = []
      let tosearch = search.toLowerCase();
      if (tosearch.length > 0){
        for(let i = 0; i < this.data.length; i++){
            let buscar = this.data[i];
            let showdata = buscar.start_process.toLowerCase();
            if(showdata.indexOf(tosearch) >= 0){
              searchArr.push(buscar);
            }
        }
        if(searchArr.length > 0 ){
          this.data = searchArr;
        }else{
          this.noresults = 1;
        }
      }else{
        this.show();
      }
    }
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
      status : 2,
      environment : this.id_environment
    })
      this.client.postRequest(`${environment.BASE_API_REGISTER}/show/device/progress`,data).subscribe(
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

  ngOnInit(): void {
    this.routes.paramMap
    .subscribe((params : ParamMap) => {
    let id = + params.get('id');
    this.id_environment = id;
    });
    this.show();
  }

}
