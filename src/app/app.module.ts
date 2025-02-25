import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NamesComponent } from './pokemon/names/names.component';
import { DetailComponent } from './pokemon/detail/detail.component';
import { AbilitiesComponent } from './pokemon/abilities/abilities.component';

@NgModule({
  declarations: [
    AppComponent,
    NamesComponent,
    DetailComponent,
    AbilitiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
