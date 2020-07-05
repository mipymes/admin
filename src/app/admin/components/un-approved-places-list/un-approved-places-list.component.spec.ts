import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnApprovedPlacesListComponent } from './un-approved-places-list.component';

describe('UnApprovedPlacesListComponent', () => {
  let component: UnApprovedPlacesListComponent;
  let fixture: ComponentFixture<UnApprovedPlacesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnApprovedPlacesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnApprovedPlacesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
