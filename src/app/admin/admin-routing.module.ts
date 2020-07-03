import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { UnApprovedPlacesListComponent } from './components/un-approved-places-list/un-approved-places-list.component';
import { PlaceDetailComponent } from './components/place-detail/place-detail.component';


const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children:[
      {
        path: '',
        component: UnApprovedPlacesListComponent
      },
      {
        path: 'edit/:id',
        component: PlaceDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
