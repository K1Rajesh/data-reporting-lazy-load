import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsAccessedCountComponent } from './reports-accessed-count.component';

describe('ReportsAccessedCountComponent', () => {
  let component: ReportsAccessedCountComponent;
  let fixture: ComponentFixture<ReportsAccessedCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsAccessedCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsAccessedCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
