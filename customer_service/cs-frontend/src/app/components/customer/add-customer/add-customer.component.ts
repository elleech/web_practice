import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent implements OnInit {
  addCustomerForm: FormGroup;
  submitted = null;
  errorMessage: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.addCustomerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z-]+')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z-]+')]],
      address: ['', Validators.required],
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
    // console.log(this.addCustomerForm.value);
    this.customerService.createCustomer(this.addCustomerForm.value).subscribe(
      (data) => {
        // console.log('success', data);
        this.submitted = true;
        setTimeout(
          () => (this.addCustomerForm.reset(), (this.submitted = null)),
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
