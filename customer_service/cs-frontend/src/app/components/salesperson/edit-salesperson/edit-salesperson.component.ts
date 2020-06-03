import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SalespersonService } from 'src/app/service/salesperson.service';
import Salesperson from 'src/app/models/salesperson.model';

@Component({
  selector: 'app-edit-salesperson',
  templateUrl: './edit-salesperson.component.html',
  styleUrls: ['./edit-salesperson.component.css'],
})
export class EditSalespersonComponent implements OnInit {
  saleUsername: string;
  editSalespersonForm: FormGroup;
  submitted = null;
  errorMessage: any;

  constructor(
    private salespersonService: SalespersonService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.saleUsername = this.activatedRoute.snapshot.paramMap.get(
      'saleUsername'
    );

    this.editSalespersonForm = this.formBuilder.group({
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

    this.salespersonService
      .getSalesperson(this.saleUsername)
      .subscribe((salesperson: Salesperson) => {
        this.editSalespersonForm.controls['username'].setValue(
          salesperson.username
        );
        this.editSalespersonForm.controls['firstname'].setValue(
          salesperson.firstname
        );
        this.editSalespersonForm.controls['lastname'].setValue(
          salesperson.lastname
        );
        this.editSalespersonForm.controls['jobtitle'].setValue(
          salesperson.jobtitle
        );
        this.editSalespersonForm.controls['location'].setValue(
          salesperson.location
        );
        this.editSalespersonForm.controls['phone'].setValue(salesperson.phone);
        this.editSalespersonForm.controls['email'].setValue(salesperson.email);
      });
  }

  onSubmit() {
    // console.log(this.editSalespersonForm.value);
    this.salespersonService
      .updateSalesperson(this.saleUsername, this.editSalespersonForm.value)
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
    this.router.navigate(['/salespeople']);
  }
}
