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
  selector: 'app-one-customer',
  templateUrl: './one-customer.component.html',
  styleUrls: ['./one-customer.component.css'],
})
export class OneCustomerComponent implements OnInit {
  custUsername: string;
  customer = new Customer();

  details: Detail[] = [];
  reports: Report[] = [];
  buys: Buy[] = [];
  products: Product[] = [];
  salespeople: Salesperson[] = [];
  employees: Employee[] = [];

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
    this.custUsername = this.activatedRoute.snapshot.paramMap.get(
      'custUsername'
    );

    // load needed data from service
    this.customerService
      .getCustomer(this.custUsername)
      .subscribe((customer: Customer) => (this.customer = customer));
    this.reportService.getReports().subscribe((reports: Report[]) => {
      this.reports = reports;
    });
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
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
      this.buyService
        .getBuyByCustomer(this.custUsername)
        .subscribe((custBuys: Buy[]) => {
          custBuys.forEach((custBuy) => {
            let product = this.products.find(
              ({ _id }) => _id === custBuy._pdtId
            );
            let salesperson = this.salespeople.find(
              ({ _id }) => _id === custBuy._saleId
            );
            let report = new Report();
            let employee = new Employee();

            if (this.reports.find(({ _buyId }) => _buyId === custBuy._id)) {
              report = this.reports.find(
                ({ _buyId }) => _buyId === custBuy._id
              );
              employee = this.employees.find(
                ({ _id }) => _id === report._emplId
              );
            }

            this.details.push({
              _buyId: custBuy._id,
              _pdtId: product._id,
              _rptId: report._id,
              custUsername: this.custUsername,
              saleUsername: salesperson.username,
              emplUsername: employee.username,
              itemname: product.itemname,
              brand: product.brand,
              unitprice: product.unitprice,
              quantity: custBuy.quantity,
              orderDate: custBuy.orderDate,
              deliverDate: custBuy.deliverDate,
              cancel: custBuy.cancel,
              subject: report.subject,
              complaint: report.complaint,
              status: report.status,
              resolution: report.resolution,
            });
          });
        });
      // console.log(this.details);
    }, 100);
  }

  onBack() {
    // DOSE NOT WORK:
    // this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    this.location.back();
  }
}
