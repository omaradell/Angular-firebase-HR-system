import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepDetailsComponent } from './dep-details.component';

describe('DepDetailsComponent', () => {
  let component: DepDetailsComponent;
  let fixture: ComponentFixture<DepDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
