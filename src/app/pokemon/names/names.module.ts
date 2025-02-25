import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NamesRoutingModule } from './names-routing.module';
import { NamesComponent } from './names.component';


@NgModule({
  declarations: [NamesComponent],
  imports: [
    CommonModule,
    NamesRoutingModule
  ]
})
export class NamesModule { }
