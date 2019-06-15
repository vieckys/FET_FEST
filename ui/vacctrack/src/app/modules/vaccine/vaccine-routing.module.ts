import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { ManageComponent } from './pages/manage/manage.component';

const routes: Routes = [
  {
    path: '',
    children: [{
      path: 'list/child/:childId',
      component: ListComponent
    },
    {
      path: 'child/:childId/:id/edit',
      component: ManageComponent
    },
    {
      path: 'add/child/:childId',
      component: ManageComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VaccineRoutingModule { }
