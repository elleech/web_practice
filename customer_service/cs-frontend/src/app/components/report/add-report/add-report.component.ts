import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ReportService } from 'src/app/service/report.service';
import { BuyService } from 'src/app/service/buy.service';
import { CustomerService } from 'src/app/service/customer.service';
import { ProductService } from 'src/app/service/product.service';
import { SalespersonService } from 'src/app/service/salesperson.service';
import { EmployeeService } from 'src/app/service/employee.service';

import Detail from 'src/app/models/detail.model';
import Report from 'src/app/models/report.model';
import Buy from 'src/app/models/buy.model';
import Product from 'src/app/models/product.model';
import Customer from 'src/app/models/customer.model';
import Salesperson from 'src/app/models/salesperson.model';
import Employee from 'src/app/models/employee.model';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css'],
})
export class AddReportComponent implements OnInit {
  addReportForm: FormGroup;

  details: Detail[] = [];
  buys: Buy[] = [];
  products: Product[] = [];
  customers: Customer[] = [];
  salespeople: Salesperson[] = [];
  employees: Employee[] = [];

  submitted = null;
  errorMessage: any;

  constructor(
    private reportService: ReportService,
    private buyService: BuyService,
    private productService: ProductService,
    private customerService: CustomerService,
    private salespersonService: SalespersonService,
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // load needed data from service
    this.buyService.getBuys().subscribe((buys: Buy[]) => {
      this.buys = buys;
    });
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
    this.employeeService.getEmployees().subscribe((employees: Employee[]) => {
      this.employees = employees;
    });

    // to solve the problem of not loading data from other service in time
    setTimeout(() => {
      // set value to details
      this.reportService.getReports().subscribe((reports: Report[]) => {
        reports.forEach((report) => {
          let buy = this.buys.find(({ _id }) => _id === report._buyId);
          let product = this.products.find(({ _id }) => _id === buy._pdtId);
          let customer = this.customers.find(({ _id }) => _id === buy._custId);
          let salesperson = this.salespeople.find(
            ({ _id }) => _id === buy._saleId
          );
          let employee = this.employees.find(
            ({ _id }) => _id === report._emplId
          );

          this.details.push({
            _buyId: buy._id,
            _pdtId: product._id,
            _rptId: report._id,
            custUsername: customer.username,
            saleUsername: salesperson.username,
            emplUsername: employee.username,
            itemname: product.itemname,
            brand: product.brand,
            unitprice: product.unitprice,
            quantity: buy.quantity,
            orderDate: buy.orderDate,
            deliverDate: buy.deliverDate,
            cancel: buy.cancel,
            subject: report.subject,
            complaint: report.subject,
            status: report.status,
            resolution: report.resolution,
          });
        });
        // console.log(this.details);
      });
    }, 100);

    // init form
    this.addReportForm = this.formBuilder.group({
      _buyId: [
        'select a buy',
        [Validators.required, Validators.pattern('\\S+.')],
      ],
      _emplId: [
        'select a employee',
        [Validators.required, Validators.pattern('\\S+.')],
      ],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      complaint: ['', [Validators.required, Validators.minLength(3)]],
      status: [{ value: 'false', disabled: true }, Validators.required],
      resolution: ['TBU', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    // upload data to service
    this.reportService.createReport(this.addReportForm.value).subscribe(
      (data) => {
        // console.log('success', data);
        this.submitted = true;
        setTimeout(
          () => (this.addReportForm.reset(), (this.submitted = null)),
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

  selectBuy(args) {
    // console.log(args.target.value);
    if (args.target.value === 'select a buy') {
      this.addReportForm.controls['_buyId'].setValue('select a buy');
    } else {
      this.addReportForm.controls['_buyId'].setValue(args.target.value);
    }
    // console.log(this.addReportForm.value);
  }

  selectEmployee(args) {
    // console.log(args.target.value);
    if (args.target.value === 'select a employee') {
      this.addReportForm.controls['_emplId'].setValue('select a employee');
    } else {
      this.addReportForm.controls['_emplId'].setValue(args.target.value);
    }
    // console.log(this.addReportForm.value);
  }

  switchStatus(args) {
    // console.log(args.target.value);
    if (args.target.value === 'TBU' || args.target.value === '') {
      this.addReportForm.controls['status'].disable();
    } else {
      this.addReportForm.controls['status'].enable();
    }
    // console.log(this.addReportForm.value);
  }
}
