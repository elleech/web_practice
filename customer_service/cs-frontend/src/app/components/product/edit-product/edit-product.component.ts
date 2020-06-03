import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ProductService } from 'src/app/service/product.service';
import Product from 'src/app/models/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  pdtId: string;
  editProductForm: FormGroup;
  submitted = null;
  errorMessage: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.pdtId = this.activatedRoute.snapshot.paramMap.get('pdtId');

    this.editProductForm = this.formBuilder.group({
      _id: [{ value: '', disabled: true }],
      itemname: ['', [Validators.required]],
      description: ['', [Validators.required]],
      brand: ['', Validators.required],
      unitprice: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    });

    this.productService.getProduct(this.pdtId).subscribe((product: Product) => {
      this.editProductForm.controls['_id'].setValue(product._id);
      this.editProductForm.controls['itemname'].setValue(product.itemname);
      this.editProductForm.controls['description'].setValue(
        product.description
      );
      this.editProductForm.controls['brand'].setValue(product.brand);
      this.editProductForm.controls['unitprice'].setValue(product.unitprice);
    });
  }

  onSubmit() {
    // console.log(this.editProductForm.value);
    this.productService
      .updateProduct(this.pdtId, this.editProductForm.value)
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
    this.router.navigate(['/products']);
  }
}
