import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PlacesService } from 'src/app/core/services/places.service';
import { IPlace } from '../../../core/models/place.model';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-un-approved-places-list',
  templateUrl: './un-approved-places-list.component.html',
  styleUrls: ['./un-approved-places-list.component.scss']
})
export class UnApprovedPlacesListComponent implements OnInit {

  public displayedColumns: string[] = ['name', 'description', 'approved','actions'];
  public unApprovedPlaces$ : Observable<IPlace[]>;
  private unApprovedPlaces : IPlace[];
  private dataSource;

  constructor(private placesService : PlacesService) { }

  ngOnInit(): void {
    this.unApprovedPlaces$ = this.placesService.getUnApprovedPlaces();
  }


  applyFilter(event: Event) {
    console.log(this.unApprovedPlaces)
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
