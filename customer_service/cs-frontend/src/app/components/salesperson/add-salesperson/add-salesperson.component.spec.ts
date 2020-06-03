import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalespersonComponent } from './add-salesperson.component';

describe('AddSalespersonComponent', () => {
  let component: AddSalespersonComponent;
  let fixture: ComponentFixture<AddSalespersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSalespersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSalespersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
