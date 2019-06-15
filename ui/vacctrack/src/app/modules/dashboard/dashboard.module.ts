import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ChildCardComponent } from './components/child-card/child-card.component';
import { AddChildCardComponent } from './components/add-child-card/add-child-card.component';

@NgModule({
  declarations: [DashboardComponent, ChildCardComponent, AddChildCardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
