import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ChildRoutingModule } from './child-routing.module';
import { ManageChildComponent } from './pages/manage-child/manage-child.component';

@NgModule({
  declarations: [ManageChildComponent],
  imports: [
    CommonModule,
    ChildRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class ChildModule { }
