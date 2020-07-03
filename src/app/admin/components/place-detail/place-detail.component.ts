import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { numberValidator } from 'src/app/shared/utils/number.validator';
import { Subject, Observable } from 'rxjs';
import { PlacesService } from '../../../core/services/places.service';
import { ICategory } from 'src/app/shared/models/category.model';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.scss']
})
export class PlaceDetailComponent implements OnInit {
  private subscription$ = new Subject<void>();
  public categories$: Observable<ICategory[]>
  placeForm: FormGroup;
  latitude: number = 51.678418;;
  longitude: number = 7.809007;
  zoom: number = 15;
  
  private id: any;
  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
     private placesService: PlacesService, private route: ActivatedRoute) {
    this.initForm();
    this.categories$ = this.placesService.getCategories();
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getPlace();
   
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription$.next();
    this.subscription$.complete();
  }

  watchApproved(){
    this.placeForm.get('approved').valueChanges
    .pipe(takeUntil(this.subscription$))
    .subscribe(status=>{
      this.updatePlaceStatus(status);
    });
  }
  
  updatePlaceStatus(status : boolean){
    this.placesService.updatePlaceStatus(this.id,status).then((result)=>{
      this._snackBar.open("Estado Actualizado", "Close", {
        duration: 2000
      });
    }).catch((error)=>{
      this._snackBar.open("Ha ocurrido un error, intente de nuevo", "Close", {
        duration: 2000
      })
    });
  }

  updatePlace(){
    this.placesService.updatePlace(this.placeForm.value).then((result)=>{
      this._snackBar.open("Negocio Actualizado", "Close", {
        duration: 2000
      });
    }).catch((error)=>{
      this._snackBar.open("Ha ocurrido un error, intente de nuevo", "Close", {
        duration: 2000
      })
    });
  }

  getPlace() {
    this.placesService.getPlace(this.id)
      .pipe(
        take(1),
        takeUntil(this.subscription$)
      )
      .subscribe((place) => {
        this.placeForm.patchValue(place);
        this.watchApproved();
        this.latitude = place.location.geopoint.latitude;
        this.longitude = place.location.geopoint.longitude;
      })
  }

  initForm() {
    this.placeForm = this.fb.group({
      id: [null,[]],
      name: [null, [Validators.required]],
      categories: [null, [Validators.required]],
      description: [null, [Validators.required]],
      facebookUrl: [null, []],
      instagramUrl: [null, []],
      phone: [null, [Validators.required, numberValidator]],
      delivery: [false, []],
      visible: [true, []],
      rating: [0, []],
      ratingCount: [0, []],
      approved: [false, []],
      schedules: this.fb.array(this.setSchedule()),
      location: this.fb.group({
        address: [null, [Validators.required]],
        geopoint: [null, [Validators.required]],
        geohash: [null, [Validators.required]],
      })
    })
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


}
