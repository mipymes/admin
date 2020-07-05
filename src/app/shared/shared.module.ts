import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDsq27YYY2cXmP2qeOPGMpYvzzdUZ9bvQc',
      libraries: ['places']
    })
    
  ],
  exports:[
    HeaderComponent,
    ReactiveFormsModule,
    MaterialModule,
    AgmCoreModule
  ]
})
export class SharedModule { }
