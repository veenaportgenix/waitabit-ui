
import { ScrollToDirective } from './helpers/scrollTo.directives';
import { WINDOW_PROVIDERS } from './helpers/window.helpers';
import { NgModule } from '@angular/core';
// import { NgForm } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { NguCarouselModule } from "@ngu/carousel";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingRoutingModule } from './landing-routing.module';
import { PricingOneComponent } from './components/pricing-one/pricing-one.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

import { BestComponent } from './components/best/best.component';
import { LeftImageComponent } from './components/left-image/left-image.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderWhiteComponent } from './components/header-white/header-white.component';


import { IntroTenComponent } from './components/intro-ten/intro-ten.component';
import { HomeComponent } from './home/home.component';
//import { DocumentationComponent } from './documentation/documentation.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
  

@NgModule({
  imports: [
    CommonModule,
    LandingRoutingModule,
    NguCarouselModule,
    NgbModule,
    FormsModule
  ],
  declarations: [
    PricingOneComponent,
    ContactFormComponent,
    BestComponent,
    LeftImageComponent,
    HeaderComponent,
    ScrollToDirective,
    HeaderWhiteComponent,
    IntroTenComponent,
    HomeComponent
  ],
  providers: [WINDOW_PROVIDERS]
  // exports: ScrollToDirective
})
export class LandingModule { }
