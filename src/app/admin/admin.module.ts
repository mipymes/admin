import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { SharedModule } from '../shared/shared.module';
import { UnApprovedPlacesListComponent } from './components/un-approved-places-list/un-approved-places-list.component';
import { PlaceDetailComponent } from './components/place-detail/place-detail.component';


@NgModule({
  declarations: [NavComponent, UnApprovedPlacesListComponent, PlaceDetailComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
