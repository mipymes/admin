import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators'
import { ICategory } from '../../shared/models/category.model';
import * as firebase from 'firebase/app'
import { IPlace } from '../models/place.model';
import * as geofirex from 'geofirex';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  public geo;
  constructor(private firestore: AngularFirestore) {
    this.geo = geofirex.init(firebase);
  }

  public getCategories(): Observable<ICategory[]> {
    return this.firestore.collection('categories').snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(action => {
            const data = action.payload.doc.data() as ICategory;
            data.id = action.payload.doc.id;
            return data;
          })
        })
      );
  }

  getUnApprovedPlaces(): Observable<IPlace[]> {
    return this.firestore.collection('places', ref => ref.where('approved', '==', false))
      .snapshotChanges()
      .pipe(
        map(spanshot => {
          return spanshot.map(action => {
            const data = action.payload.doc.data() as IPlace;
            data.id = action.payload.doc.id;
            return data;
          })
        })
      )
  }

  getPlace(id: string): Observable<IPlace> {
    return this.firestore.collection('places').doc(id).valueChanges()
      .pipe(map(value => {
        const data : IPlace = value as IPlace;
        data.id = id
        data.categories = data.categories[0];
        return data;
      }))
  }

  updatePlaceStatus(id: string, status : boolean) : Promise<void>{
    return this.firestore.collection('places').doc(id).update({'approved': status})
  }

  updatePlace(place : IPlace){
    let updatePlace: IPlace = {
      ...place,
      categories: [
        place.categories
      ]
    }
    return this.firestore.collection('places').doc(place.id).update({...updatePlace});
  }

  createPlace(place: IPlace): Promise<any> {
    let newPLace: IPlace = {
      ...place,
      categories: [
        place.categories
      ]
    }
    return this.firestore.collection('places').add(newPLace);
  }


  createGeoPoint(latitud: number, longitude: number) {
    const geoPoint = new firebase.firestore.GeoPoint(latitud, longitude);
    return geoPoint;
  }

  createGeoPointHash(latitud: number, longitude: number) {
    const point = this.geo.point(latitud, longitude);
    return point;
  }
}
