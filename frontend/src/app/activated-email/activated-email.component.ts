import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import {ClientService} from '../service/client.service';
import {environment} from '../../environments/environment';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-activated-email',
  templateUrl: './activated-email.component.html',
  styleUrls: ['./activated-email.component.css']
})
export class ActivatedEmailComponent implements OnInit {

  constructor(
    private route: Router,
    private routes : ActivatedRoute,
    private client: ClientService,
  ) { }

  ngOnInit(): void {
    this.routes.paramMap
      .subscribe((params : ParamMap) => {
      let id = + params.get('id');
      console.log(id);
      this.activated_account(id);
    });
  }

  activated_account(id){
    this.client.getRequestId(`${environment.BASE_API_REGISTER}/activated/`+ id).subscribe(
      (response : any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cuenta activada',
          showConfirmButton: false,
          timer: 3500
        });
        this.route.navigate(['/login']);
      },(error) => {
        console.log(error);
      }
    )
  }

}
