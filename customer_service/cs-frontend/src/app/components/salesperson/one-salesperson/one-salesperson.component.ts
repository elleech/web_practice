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
  selector: 'app-one-salesperson',
  templateUrl: './one-salesperson.component.html',
  styleUrls: ['./one-salesperson.component.css'],
})
export class OneSalespersonComponent implements OnInit {
  saleUsername: string;
  salesperson = new Salesperson();

  details: Detail[] = [];
  reports: Report[] = [];
  buys: Buy[] = [];
  products: Product[] = [];
  customers: Customer[] = [];
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
    this.saleUsername = this.activatedRoute.snapshot.paramMap.get(
      'saleUsername'
    );

    // load needed data from service
    this.salespersonService
      .getSalesperson(this.saleUsername)
      .subscribe((salesperson: Salesperson) => {
        this.salesperson = salesperson;
      });
    this.reportService.getReports().subscribe((reports: Report[]) => {
      this.reports = reports;
    });
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
    this.customerService.getCustomers().subscribe((customers: Customer[]) => {
      this.customers = customers;
    });
    this.employeeService.getEmployees().subscribe((employees: Employee[]) => {
      this.employees = employees;
    });

    // to solve the problem of not loading data from other service in time
    setTimeout(() => {
      // set value to details
      this.buyService
        .getBuyBySalesperson(this.saleUsername)
        .subscribe((saleBuys: Buy[]) => {
          saleBuys.forEach((saleBuy) => {
            let product = this.products.find(
              ({ _id }) => _id === saleBuy._pdtId
            );
            let customer = this.customers.find(
              ({ _id }) => _id === saleBuy._custId
            );
            let report = new Report();
            let employee = new Employee();

            if (this.reports.find(({ _buyId }) => _buyId === saleBuy._id)) {
              report = this.reports.find(
                ({ _buyId }) => _buyId === saleBuy._id
              );
              employee = this.employees.find(
                ({ _id }) => _id === report._emplId
              );
            }

            this.details.push({
              _buyId: saleBuy._id,
              _pdtId: product._id,
              _rptId: report._id,
              custUsername: customer.username,
              saleUsername: this.saleUsername,
              emplUsername: employee.username,
              itemname: product.itemname,
              brand: product.brand,
              unitprice: product.unitprice,
              quantity: saleBuy.quantity,
              orderDate: saleBuy.orderDate,
              deliverDate: saleBuy.deliverDate,
              cancel: saleBuy.cancel,
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
    this.location.back();
  }
}
