import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { ReportService } from 'src/app/service/report.service';
import { BuyService } from 'src/app/service/buy.service';
import { ProductService } from 'src/app/service/product.service';
import { CustomerService } from 'src/app/service/customer.service';
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
  selector: 'app-one-employee',
  templateUrl: './one-employee.component.html',
  styleUrls: ['./one-employee.component.css'],
})
export class OneEmployeeComponent implements OnInit {
  emplUsername: string;
  employee = new Employee();

  details: Detail[] = [];
  buys: Buy[] = [];
  products: Product[] = [];
  customers: Customer[] = [];
  salespeople: Salesperson[] = [];

  constructor(
    private reportService: ReportService,
    private buyService: BuyService,
    private productService: ProductService,
    private customerService: CustomerService,
    private salespersonService: SalespersonService,
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.emplUsername = this.activatedRoute.snapshot.paramMap.get(
      'emplUsername'
    );

    // load needed data from service
    this.employeeService
      .getEmployee(this.emplUsername)
      .subscribe((employee: Employee) => {
        this.employee = employee;
      });
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

    // to solve the problem of not loading data from other service in time
    setTimeout(() => {
      // set value to details
      this.reportService
        .getReportByEmployee(this.emplUsername)
        .subscribe((emplRpts: Report[]) => {
          emplRpts.forEach((emplRpt) => {
            let buy = this.buys.find(({ _id }) => _id === emplRpt._buyId);
            let product = this.products.find(({ _id }) => _id === buy._pdtId);
            let customer = this.customers.find(
              ({ _id }) => _id === buy._custId
            );
            let salesperson = this.salespeople.find(
              ({ _id }) => _id === buy._saleId
            );

            this.details.push({
              _buyId: buy._id,
              _pdtId: product._id,
              _rptId: emplRpt._id,
              custUsername: customer.username,
              saleUsername: salesperson.username,
              emplUsername: this.emplUsername,
              itemname: product.itemname,
              brand: product.brand,
              unitprice: product.unitprice,
              quantity: buy.quantity,
              orderDate: buy.orderDate,
              deliverDate: buy.deliverDate,
              cancel: buy.cancel,
              subject: emplRpt.subject,
              complaint: emplRpt.complaint,
              status: emplRpt.status,
              resolution: emplRpt.resolution,
            });
          });
        });
      // console.log(this.details);
    }, 100);
  }

  onBack() {
    this.location.back();
  }
}
