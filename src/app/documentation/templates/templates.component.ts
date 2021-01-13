import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
  url: string = "./assets/templates/vochful/TASK1.html";
  urlSafe: SafeResourceUrl;


  constructor(public sanitizer: DomSanitizer) { 
   
    
  }
preview(data:any)
{console.log(data);
  this.url="./assets/templates/vochful/"+data+".html"
  this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  
}


  ngOnInit() {
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
}
