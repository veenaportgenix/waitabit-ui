import { NgModule } from '@angular/core';
import { NgbModule, NgbNavModule} from '@ng-bootstrap/ng-bootstrap';

import { PublicRoutingModule } from './public-routing/public-routing.module';



@NgModule({
  imports: [
    PublicRoutingModule,
    NgbModule,
    NgbNavModule,
  ],
  declarations: []  
})
export class PublicModule { }