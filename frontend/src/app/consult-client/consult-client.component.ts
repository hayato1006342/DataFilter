import { Component, OnInit, Input, Type} from '@angular/core';
import * as html2pdf from 'html2pdf.js';


@Component({
  selector: 'app-consult-client',
  templateUrl: './consult-client.component.html',
  styleUrls: ['./consult-client.component.css']
})
export class ConsultClientComponent implements OnInit {


  @Input() data : any;

  
  constructor() { }

  ngOnInit(): void {
    
  }

  generatepdf(){
    const options = {
      name: 'output.pdf',
      filename:'DATA FILTER',
      imagen : {type: 'jpg'},
      html2canvas : {},
      jsPDF : {orientation:'landscape'}
    }

    const element:Element = document.getElementById('table');
    html2pdf().from(element).set(options).save()
  }


}
