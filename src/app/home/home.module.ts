import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AddPlaceComponent } from './components/add-place/add-place.component';
import { SharedModule } from '../shared/shared.module';
import { DragableMarkerMapComponent } from './components/dragable-marker-map/dragable-marker-map.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [HomeComponent, AddPlaceComponent, DragableMarkerMapComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,

  ]
})
export class HomeModule { }
