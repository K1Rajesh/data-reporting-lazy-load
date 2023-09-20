import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubFeturesComponent } from './sub-fetures.component';

describe('SubFeturesComponent', () => {
  let component: SubFeturesComponent;
  let fixture: ComponentFixture<SubFeturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubFeturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubFeturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
