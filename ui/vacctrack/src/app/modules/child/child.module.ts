import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildRoutingModule } from './child-routing.module';
import { ManageChildComponent } from './pages/manage-child/manage-child.component';

@NgModule({
  declarations: [ManageChildComponent],
  imports: [
    CommonModule,
    ChildRoutingModule
  ]
})
export class ChildModule { }
