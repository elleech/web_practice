import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneSalespersonComponent } from './one-salesperson.component';

describe('OneSalespersonComponent', () => {
  let component: OneSalespersonComponent;
  let fixture: ComponentFixture<OneSalespersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneSalespersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneSalespersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
