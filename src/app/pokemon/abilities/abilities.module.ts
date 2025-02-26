import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbilitiesRoutingModule } from './abilities-routing.module';


@NgModule({
  declarations: [AbilitiesModule],
  imports: [
    CommonModule,
    AbilitiesRoutingModule
  ]
})
export class AbilitiesModule { }
