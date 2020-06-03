import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneEmployeeComponent } from './one-employee.component';

describe('OneEmployeeComponent', () => {
  let component: OneEmployeeComponent;
  let fixture: ComponentFixture<OneEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
