import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageChildComponent } from './pages/manage-child/manage-child.component';

const routes: Routes = [
  {
    path: '',
    children: [{
      path: 'add',
      component: ManageChildComponent
    },
    {
      path: ':id/edit',
      component: ManageChildComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildRoutingModule { }
