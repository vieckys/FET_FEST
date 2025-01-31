import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { VaccineRoutingModule } from './vaccine-routing.module';
import { ListComponent } from './pages/list/list.component';
import { ManageComponent } from './pages/manage/manage.component';

@NgModule({
  declarations: [ListComponent, ManageComponent],
  imports: [
    CommonModule,
    VaccineRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class VaccineModule { }
