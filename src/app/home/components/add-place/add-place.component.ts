import { ICategory } from './../../../shared/models/category.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormGroupDirective } from '@angular/forms';
import { PlacesService } from '../../../core/services/places.service';
import { Observable } from 'rxjs';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { numberValidator } from 'src/app/shared/utils/number.validator';
import { MatSnackBar } from '@angular/material/snack-bar';

// enum status {

//   notApproved = 0,
//   approved = 1,
// }
@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.scss']
})
export class AddPlaceComponent implements OnInit {
  public categories$: Observable<ICategory[]>
  placeForm: FormGroup;

  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#424242',
      buttonColor: '#fff'
    },
    dial: {
      dialBackgroundColor: '#555',
    },
    clockFace: {
      clockFaceBackgroundColor: '#555',
      clockHandColor: '#9fbd90',
      clockFaceTimeInactiveColor: '#fff'
    }
  };

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private placesService: PlacesService) {
    this.categories$ = this.placesService.getCategories();
    this.initForm();


  }


  ngOnInit(): void {
    //  this.getCategories();
    console.log(this.placeForm);
  }

  getCategories() {
    this.placesService.getCategories().subscribe(console.log)
  }

  sendPlace() {
    this.placesService.createPlace(this.placeForm.value).then(res => {
      this._snackBar.open("Negocio Agregado", "Close", {
        duration: 2000
      });
     this.resetForm();
    }).catch((error) => {
      this._snackBar.open("Ha ocurrido un error, intente de nuevo", "Close", {
        duration: 2000
      });
    })
  }

  initForm() {
    this.placeForm = this.fb.group({
      name: [null, [Validators.required]],
      categories: [null, [Validators.required]],
      description: [null, [Validators.required]],
      facebookUrl: [null, []],
      instagramUrl: [null, []],
      phone: [null, [Validators.required, numberValidator]],
      delivery: [false, []],
      visible: [true, []],
      rating:[0, []],
      ratingCount: [0,[]],
      approved: [false, []],
      schedules: this.fb.array(this.setSchedule()),
      location: this.fb.group({
        address: [null, [Validators.required]],
        geopoint: [null, [Validators.required]],
        geohash: [null, [Validators.required]],
      })
    })
  }




  resetForm(){
    this.formGroupDirective.resetForm();
     this.placeForm.controls.approved.setValue(false);
     this.placeForm.controls.visible.setValue(true);
     this.placeForm.controls.rating.setValue(0);
     this.placeForm.controls.ratingCount.setValue(0);
     this.placeForm.controls.schedules['controls'].forEach(e => {
      e.controls['open'].setValue('8:00 am');
       e.controls['close'].setValue('8:00 pm');
       e.controls['status'].setValue(true);
     }); 
  }

  get schedules() {
    return this.placeForm.get('schedules') as FormArray;
  }

  getDay(i): String {
    switch (i) {
      case 0:
        return 'Lunes'
      case 1:
        return 'Martes'
      case 2:
        return 'Miercoles'
      case 3:
        return 'Jueves'
      case 4:
        return 'Viernes'
      case 5:
        return 'Sabado'
      case 6:
        return 'Domingo'
      default:
        return ''
    }
  }

  setSchedule(): any[] {
    return [
      this.fb.group({
        open: ['8:00 am', []],
        close: ['8:00 pm', []],
        status: [true, []]
      }),
      this.fb.group({
        open: ['8:00 am', []],
        close: ['8:00 pm', []],
        status: [true, []]
      }),
      this.fb.group({
        open: ['8:00 am', []],
        close: ['8:00 pm', []],
        status: [true, []]
      }),
      this.fb.group({
        open: ['8:00 am', []],
        close: ['8:00 pm', []],
        status: [true, []]
      }),
      this.fb.group({
        open: ['8:00 am', []],
        close: ['8:00 pm', []],
        status: [true, []]
      }),
      this.fb.group({
        open: ['8:00 am', []],
        close: ['8:00 pm', []],
        status: [true, []]
      }),
      this.fb.group({
        open: ['8:00 am', []],
        close: ['8:00 pm', []],
        status: [true, []]
      }),
    ]
  }

  getlocationGeoPoint(point) {
    console.log(point);
    this.placeForm.controls.location['controls']['geohash'].setValue(point.geohash);
    this.placeForm.controls.location['controls']['geopoint'].setValue(point.geopoint);
    console.log(this.placeForm.value);
  }
}
