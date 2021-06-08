import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';
import {environment} from '../../environments/environment';
import { ClientService} from '../service/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(
    private client: ClientService,
    private auth: AuthService,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.client.getRequest(`${environment.BASE_API_REGISTER}/authorization`,localStorage.getItem('token')).subscribe(
      (response: any) => {
        this.route.navigate(['/environments']);
      },(error) => {
        console.log(error);
        this.auth.logout()
        this.route.navigate(['/']);
      });
  }

}
