import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalespersonComponent } from './edit-salesperson.component';

describe('EditSalespersonComponent', () => {
  let component: EditSalespersonComponent;
  let fixture: ComponentFixture<EditSalespersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSalespersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSalespersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
