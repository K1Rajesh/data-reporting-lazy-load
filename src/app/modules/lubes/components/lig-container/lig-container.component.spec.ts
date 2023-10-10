import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigContainerComponent } from './lig-container.component';

describe('LigContainerComponent', () => {
  let component: LigContainerComponent;
  let fixture: ComponentFixture<LigContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LigContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
