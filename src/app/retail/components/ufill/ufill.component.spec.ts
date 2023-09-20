import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UfillComponent } from './ufill.component';

describe('UfillComponent', () => {
  let component: UfillComponent;
  let fixture: ComponentFixture<UfillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UfillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UfillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
