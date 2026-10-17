import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeClosureRequest } from './fore-closure-request';

describe('ForeClosureRequest', () => {
  let component: ForeClosureRequest;
  let fixture: ComponentFixture<ForeClosureRequest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForeClosureRequest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForeClosureRequest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
