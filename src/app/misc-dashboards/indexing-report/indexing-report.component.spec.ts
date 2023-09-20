import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexingReportComponent } from './indexing-report.component';

describe('IndexingReportComponent', () => {
  let component: IndexingReportComponent;
  let fixture: ComponentFixture<IndexingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexingReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
