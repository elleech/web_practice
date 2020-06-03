import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SalespersonService } from 'src/app/service/salesperson.service';

@Component({
  selector: 'app-add-salesperson',
  templateUrl: './add-salesperson.component.html',
  styleUrls: ['./add-salesperson.component.css'],
})
export class AddSalespersonComponent implements OnInit {
  addSalespersonForm: FormGroup;
  submitted = null;
  errorMessage: any;

  constructor(
    private salespersonService: SalespersonService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.addSalespersonForm = this.formBuilder.group({
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
    // console.log(this.addSalespersonForm.value);
    this.salespersonService
      .createSalesperson(this.addSalespersonForm.value)
      .subscribe(
        (data) => {
          // console.log('success', data);
          this.submitted = true;
          setTimeout(
            () => (this.addSalespersonForm.reset(), (this.submitted = null)),
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
