import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Foreclosuredetails } from './foreclosuredetails';

describe('Foreclosuredetails', () => {
  let component: Foreclosuredetails;
  let fixture: ComponentFixture<Foreclosuredetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Foreclosuredetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Foreclosuredetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
