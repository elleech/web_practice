import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  addProductForm: FormGroup;
  submitted = null;
  errorMessage: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.addProductForm = this.formBuilder.group({
      itemname: ['', [Validators.required]],
      description: ['', [Validators.required]],
      brand: ['', Validators.required],
      unitprice: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    });
  }

  onSubmit() {
    // console.log(this.addProductForm.value);
    this.productService.createProduct(this.addProductForm.value).subscribe(
      (data) => {
        // console.log('success', data);
        this.submitted = true;
        setTimeout(
          () => (this.addProductForm.reset(), (this.submitted = null)),
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
