import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  NgbDateStruct,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';

import { BuyService } from 'src/app/service/buy.service';
import { ProductService } from 'src/app/service/product.service';
import { CustomerService } from 'src/app/service/customer.service';
import { SalespersonService } from 'src/app/service/salesperson.service';

import Buy from 'src/app/models/buy.model';
import Product from 'src/app/models/product.model';
import Customer from 'src/app/models/customer.model';
import Salesperson from 'src/app/models/salesperson.model';

@Component({
  selector: 'app-edit-buy',
  templateUrl: './edit-buy.component.html',
  styleUrls: ['./edit-buy.component.css'],
})
export class EditBuyComponent implements OnInit {
  buyId: string;
  editBuyForm: FormGroup;

  products: Product[] = [];
  customers: Customer[] = [];
  salespeople: Salesperson[] = [];

  submitted = null;
  errorMessage: any;

  price: any = 'price';

  constructor(
    private buyService: BuyService,
    private productService: ProductService,
    private customerService: CustomerService,
    private salespersonService: SalespersonService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private ngbDateParserFormatter: NgbDateParserFormatter
  ) {}

  ngOnInit() {
    this.buyId = this.activatedRoute.snapshot.paramMap.get('buyId');

    // load needed data from service
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
    this.customerService.getCustomers().subscribe((customers: Customer[]) => {
      this.customers = customers;
    });
    this.salespersonService
      .getSalespeople()
      .subscribe((salespeople: Salesperson[]) => {
        this.salespeople = salespeople;
      });

    // init form
    this.editBuyForm = this.formBuilder.group({
      _id: [{ value: '', disabled: true }, Validators.required],
      _custId: ['', [Validators.required, Validators.pattern('\\S+.')]],
      _pdtId: ['', [Validators.required, Validators.pattern('\\S+.')]],
      _saleId: ['', [Validators.required, Validators.pattern('\\S+.')]],
      quantity: [
        '',
        [Validators.required, Validators.min(1), Validators.pattern('[0-9]+')],
      ],
      orderDate: ['', [Validators.required]],
      deliverDate: ['', [Validators.required]],
    });

    // load value to form
    this.buyService.getBuyById(this.buyId).subscribe((buy: Buy) => {
      this.editBuyForm.controls['_id'].setValue(buy._id);
      this.editBuyForm.controls['_custId'].setValue(buy._custId);
      this.editBuyForm.controls['_pdtId'].setValue(buy._pdtId);
      this.editBuyForm.controls['_saleId'].setValue(buy._saleId);
      this.editBuyForm.controls['quantity'].setValue(buy.quantity);
      // convert Date to ngbDate
      this.editBuyForm.controls['orderDate'].setValue(
        this.dateToNgbDate(buy.orderDate)
      );
      this.editBuyForm.controls['deliverDate'].setValue(
        this.dateToNgbDate(buy.deliverDate)
      );

      // load value to price
      this.price = this.products.find(
        ({ _id }) => _id === buy._pdtId
      ).unitprice;
    });
  }

  onSubmit() {
    // convert ngbDate to Date
    let orderDateDate = this.ngbDateToDate(
      this.editBuyForm.get('orderDate').value
    );
    let deliverDateDate = this.ngbDateToDate(
      this.editBuyForm.get('deliverDate').value
    );
    this.editBuyForm.controls['orderDate'].setValue(orderDateDate);
    this.editBuyForm.controls['deliverDate'].setValue(deliverDateDate);

    // console.log(this.editBuyForm.value);

    // upload data to service
    this.buyService.updateBuy(this.buyId, this.editBuyForm.value).subscribe(
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
    this.router.navigate(['/buys']);
  }

  ngbDateToString(ngbDate: NgbDateStruct) {
    // example of ngbDate: { day: 1, month: 1, year: 2000 }
    return this.ngbDateParserFormatter.format(ngbDate);
  }

  ngbDateToDate(ngbDate: NgbDateStruct) {
    // example of ngbDate: { day: 1, month: 1, year: 2000 }
    return new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
  }

  dateToNgbDate(date: Date) {
    // example of date from server: 2020-05-11T00:00:00.000Z
    return {
      day: Number(date.toString().substring(8, 10)),
      month: Number(date.toString().substring(5, 7)),
      year: Number(date.toString().substring(0, 4)),
    };
  }

  dateFailed() {
    // if order date is later than deliver date
    return (
      this.ngbDateParserFormatter.format(
        this.editBuyForm.get('orderDate').value
      ) >
      this.ngbDateParserFormatter.format(
        this.editBuyForm.get('deliverDate').value
      )
    );
  }

  selectProduct(args) {
    // console.log(args.target.value);
    if (args.target.value === 'select a product') {
      this.price = 'price';
      this.editBuyForm.controls['_pdtId'].setValue('select a product');
    } else {
      this.price = this.products.find(
        ({ _id }) => _id === args.target.value
      ).unitprice;
      this.editBuyForm.controls['_pdtId'].setValue(args.target.value);
    }
    // console.log(this.editBuyForm.value);
  }

  selectCustomer(args) {
    // console.log(args.target.value);
    if (args.target.value === 'select a customer') {
      this.editBuyForm.controls['_custId'].setValue('select a customer');
    } else {
      this.editBuyForm.controls['_custId'].setValue(args.target.value);
    }
    // console.log(this.editBuyForm.value);
  }

  selectSalesperson(args) {
    // console.log(args.target.value);
    if (args.target.value === 'select a salesperson') {
      this.editBuyForm.controls['_saleId'].setValue('select a salesperson');
    } else {
      this.editBuyForm.controls['_saleId'].setValue(args.target.value);
    }
    // console.log(this.editBuyForm.value);
  }
}
