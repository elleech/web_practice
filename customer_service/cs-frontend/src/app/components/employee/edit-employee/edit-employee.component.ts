import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EmployeeService } from 'src/app/service/employee.service';
import Employee from 'src/app/models/employee.model';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  emplUsername: string;
  editEmployeeForm: FormGroup;
  submitted = null;
  errorMessage: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.emplUsername = this.activatedRoute.snapshot.paramMap.get(
      'emplUsername'
    );

    this.editEmployeeForm = this.formBuilder.group({
      username: [
        { value: '', disabled: true },
        [Validators.required, Validators.minLength(3)],
      ],
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

    this.employeeService
      .getEmployee(this.emplUsername)
      .subscribe((employee: Employee) => {
        this.editEmployeeForm.controls['username'].setValue(employee.username);
        this.editEmployeeForm.controls['firstname'].setValue(
          employee.firstname
        );
        this.editEmployeeForm.controls['lastname'].setValue(employee.lastname);
        this.editEmployeeForm.controls['jobtitle'].setValue(employee.jobtitle);
        this.editEmployeeForm.controls['location'].setValue(employee.location);
        this.editEmployeeForm.controls['phone'].setValue(employee.phone);
        this.editEmployeeForm.controls['email'].setValue(employee.email);
      });
  }

  onSubmit() {
    // console.log(this.editEmployeeForm.value);
    this.employeeService
      .updateEmployee(this.emplUsername, this.editEmployeeForm.value)
      .subscribe(
        (data) => {
          // console.log('success', data);
          this.submitted = true;
          setTimeout(() => ((this.submitted = null), this.onCancel()), 1000);
        },
        (error) => {
          // console.log('error', error);
          this.submitted = false;
          this.errorMessage = error;
        }
      );
  }

  onCancel() {
    this.router.navigate(['/employees']);
  }
}
