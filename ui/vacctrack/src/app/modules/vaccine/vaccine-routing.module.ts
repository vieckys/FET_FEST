import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { ManageComponent } from './pages/manage/manage.component';

const routes: Routes = [
  {
    path: '',
    children: [{
      path: 'list',
      component: ListComponent
    },
    {
      path: ':id/:childId/edit',
      component: ManageComponent
    },
    {
      path: 'add',
      component: ManageComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VaccineRoutingModule { }
