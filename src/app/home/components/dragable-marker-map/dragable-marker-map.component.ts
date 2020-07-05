import { Component, OnInit, NgZone, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { PlacesService } from '../../../core/services/places.service';

@Component({
  selector: 'app-dragable-marker-map',
  templateUrl: './dragable-marker-map.component.html',
  styleUrls: ['./dragable-marker-map.component.scss']
})
export class DragableMarkerMapComponent implements OnInit {

  title: string = 'MiPymes App';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  @Output()
  locationGeoPoint = new EventEmitter<any>();
  constructor( private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private placesService : PlacesService) { }

  ngOnInit(): void {
   //load Places Autocomplete
   this.mapsAPILoader.load().then(() => {
    this.setCurrentLocation();
    this.geoCoder = new google.maps.Geocoder;

    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        //set latitude, longitude and zoom
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.zoom = 12;
      });
    });
  });
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 16;
      });
    }
  }

  markerDragEnd($event: MouseEvent) {
    // console.log($event);
    this.latitude = $event['coords'].lat;
    this.longitude = $event['coords'].lng;
    this.locationGeoPoint.emit(this.placesService.createGeoPointHash(this.latitude, this.longitude));
    // console.log(this.placesService.createGeoPoint(this.latitude, this.longitude));
    // console.log(this.placesService.createGeoPointHash(this.latitude, this.longitude));
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      // console.log(results);
      // console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 16;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

}
