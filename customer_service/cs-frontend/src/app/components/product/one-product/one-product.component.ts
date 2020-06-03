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
  selector: 'app-one-product',
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.css'],
})
export class OneProductComponent implements OnInit {
  pdtId: string;
  product = new Product();

  details: Detail[] = [];
  reports: Report[] = [];
  buys: Buy[] = [];
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
    this.pdtId = this.activatedRoute.snapshot.paramMap.get('pdtId');

    // load needed data from service
    this.productService.getProduct(this.pdtId).subscribe((product: Product) => {
      this.product = product;
    });
    this.reportService.getReports().subscribe((reports: Report[]) => {
      this.reports = reports;
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
      this.buyService
        .getBuyByProduct(this.pdtId)
        .subscribe((pdtSells: Buy[]) => {
          pdtSells.forEach((pdtSell) => {
            let customer = this.customers.find(
              ({ _id }) => _id === pdtSell._custId
            );
            let salesperson = this.salespeople.find(
              ({ _id }) => _id === pdtSell._saleId
            );
            let report = new Report();
            let employee = new Employee();

            if (this.reports.find(({ _buyId }) => _buyId === pdtSell._id)) {
              report = this.reports.find(
                ({ _buyId }) => _buyId === pdtSell._id
              );
              employee = this.employees.find(
                ({ _id }) => _id === report._emplId
              );
            }

            this.details.push({
              _buyId: pdtSell._id,
              _pdtId: this.pdtId,
              _rptId: report._id,
              custUsername: customer.username,
              saleUsername: salesperson.username,
              emplUsername: employee.username,
              itemname: this.product.itemname,
              brand: this.product.brand,
              unitprice: this.product.unitprice,
              quantity: pdtSell.quantity,
              orderDate: pdtSell.orderDate,
              deliverDate: pdtSell.deliverDate,
              cancel: pdtSell.cancel,
              subject: report.subject,
              complaint: report.complaint,
              status: report.status,
              resolution: report.resolution,
            });
          });
          console.log(this.details);
        });
    }, 100);
  }

  onBack() {
    this.location.back();
  }
}
