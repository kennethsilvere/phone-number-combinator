import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PhoneNumberFormComponent } from './phone-number-form/phone-number-form.component';
import { CombinationService } from './services/combination.service';
import { CombinationsViewComponent } from './combinations-view/combinations-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PhoneNumberFormComponent,
    CombinationsViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    CombinationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
