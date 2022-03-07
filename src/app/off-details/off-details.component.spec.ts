import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffDetailsComponent } from './off-details.component';

describe('OffDetailsComponent', () => {
  let component: OffDetailsComponent;
  let fixture: ComponentFixture<OffDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
