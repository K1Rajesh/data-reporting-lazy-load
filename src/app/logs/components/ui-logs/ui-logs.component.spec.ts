import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiLogsComponent } from './ui-logs.component';

describe('UiLogsComponent', () => {
  let component: UiLogsComponent;
  let fixture: ComponentFixture<UiLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
