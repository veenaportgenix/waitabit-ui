import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})

export class DocumentationComponent {
  title = 'Waitabit';
  
  showMenu: string;
  ngOnInit() {
    this.showMenu = '';
  }
 
  addExpandClass(element: any) {
    if (element === this.showMenu) {
        this.showMenu = '0';
    } else {
        this.showMenu = element;
    }
}

}

  