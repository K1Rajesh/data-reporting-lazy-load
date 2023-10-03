import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LubesComponent } from './lubes.component';

describe('LubesComponent', () => {
  let component: LubesComponent;
  let fixture: ComponentFixture<LubesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LubesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LubesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
