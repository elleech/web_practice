import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import { ReportService } from 'src/app/service/report.service';
import { BuyService } from 'src/app/service/buy.service';
import { ProductService } from 'src/app/service/product.service';
import { EmployeeService } from 'src/app/service/employee.service';

import Detail from 'src/app/models/detail.model';
import Report from 'src/app/models/report.model';
import Buy from 'src/app/models/buy.model';
import Product from 'src/app/models/product.model';
import Employee from 'src/app/models/employee.model';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  faEdit = faEdit;

  details: Detail[] = [];
  buys: Buy[] = [];
  products: Product[] = [];
  employees: Employee[] = [];

  constructor(
    private reportService: ReportService,
    private buyService: BuyService,
    private productService: ProductService,
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // load needed data from service
    this.buyService.getBuys().subscribe((buys: Buy[]) => {
      this.buys = buys;
    });
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
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
          let employee = this.employees.find(
            ({ _id }) => _id === report._emplId
          );

          this.details.push({
            _buyId: buy._id,
            _pdtId: product._id,
            _rptId: report._id,
            custUsername: null,
            saleUsername: null,
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
  }

  onCreate() {
    this.router.navigate(['./add'], {
      relativeTo: this.activatedRoute,
    });
  }

  onEdit(rptId: string) {
    // console.log(rptId);
    this.router.navigate(['./edit', rptId], {
      relativeTo: this.activatedRoute,
    });
  }

  onDelete(rptId: string) {
    this.reportService.deleteReport(rptId).subscribe(
      (data) => {
        console.log('success', data);
        window.location.reload();
      },
      (error) => console.log('error', error)
    );
  }

  onLookup(rptId: string) {
    this.router.navigate(['./lookup', rptId], {
      relativeTo: this.activatedRoute,
    });
  }
}
