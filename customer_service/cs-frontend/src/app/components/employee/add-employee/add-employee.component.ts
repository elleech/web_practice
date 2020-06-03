import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm: FormGroup;
  submitted = null;
  errorMessage: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.addEmployeeForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z-]+')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z-]+')]],
      jobtitle: ['', Validators.required],
      location: ['', Validators.required],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern('[0-9]+'),
        ],
      ],
      email: ['', [Validators.required, Validators.pattern('.+@.+[.].+')]],
    });
  }

  onSubmit() {
    // console.log(this.addEmployeeForm.value);
    this.employeeService.createEmployee(this.addEmployeeForm.value).subscribe(
      (data) => {
        // console.log('success', data);
        this.submitted = true;
        setTimeout(
          () => (this.addEmployeeForm.reset(), (this.submitted = null)),
          1000
        );
      },
      (error) => {
        // console.log('error', error);
        this.submitted = false;
        this.errorMessage = error;
      }
    );
  }

  onCancel() {
    this.router.navigate(['../'], {
      relativeTo: this.activatedRoute,
    });
  }
}
