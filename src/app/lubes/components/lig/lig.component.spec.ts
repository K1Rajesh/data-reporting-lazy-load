import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigComponent } from './lig.component';

describe('LigComponent', () => {
  let component: LigComponent;
  let fixture: ComponentFixture<LigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
