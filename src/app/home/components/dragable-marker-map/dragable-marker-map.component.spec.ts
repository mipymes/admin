import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragableMarkerMapComponent } from './dragable-marker-map.component';

describe('DragableMarkerMapComponent', () => {
  let component: DragableMarkerMapComponent;
  let fixture: ComponentFixture<DragableMarkerMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragableMarkerMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragableMarkerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
