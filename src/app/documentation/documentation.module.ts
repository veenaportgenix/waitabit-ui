import { NgModule } from '@angular/core';
import { NgbModule, NgbNavModule} from '@ng-bootstrap/ng-bootstrap';

import { DocumentationRoutingModule } from './documentation-routing.module';





@NgModule({
  imports: [
    DocumentationRoutingModule,
    NgbModule,
    NgbNavModule,
  ],
  declarations: []  
})
export class DocumentationModule { }