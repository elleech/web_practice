import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { BuyService } from 'src/app/service/buy.service';
import { ProductService } from 'src/app/service/product.service';
import { CustomerService } from 'src/app/service/customer.service';
import { SalespersonService } from 'src/app/service/salesperson.service';

import Detail from 'src/app/models/detail.model';
import Buy from 'src/app/models/buy.model';
import Product from 'src/app/models/product.model';
import Customer from 'src/app/models/customer.model';
import Salesperson from 'src/app/models/salesperson.model';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css'],
})
export class BuyComponent implements OnInit {
  faEdit = faEdit;
  faWindowClose = faWindowClose;
  faTrashAlt = faTrashAlt;

  details: Detail[] = [];
  buys: Buy[] = [];
  products: Product[] = [];
  customers: Customer[] = [];
  salespeople: Salesperson[] = [];

  constructor(
    private buyService: BuyService,
    private productService: ProductService,
    private customerService: CustomerService,
    private salespersonService: SalespersonService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
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

    // to solve the problem of not loading data from other service in time
    setTimeout(() => {
      // set value to details
      this.buyService.getBuys().subscribe((buys: Buy[]) => {
        buys.forEach((buy) => {
          let product = this.products.find(({ _id }) => _id === buy._pdtId);
          let customer = this.customers.find(({ _id }) => _id === buy._custId);
          let salesperson = this.salespeople.find(
            ({ _id }) => _id === buy._saleId
          );

          this.details.push({
            _buyId: buy._id,
            _pdtId: product._id,
            _rptId: null,
            custUsername: customer.username,
            saleUsername: salesperson.username,
            emplUsername: null,
            itemname: product.itemname,
            brand: product.brand,
            unitprice: product.unitprice,
            quantity: buy.quantity,
            orderDate: buy.orderDate,
            deliverDate: buy.deliverDate,
            cancel: buy.cancel,
            subject: null,
            complaint: null,
            status: null,
            resolution: null,
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

  onEdit(buyId: string) {
    // console.log(buyId);
    this.router.navigate(['./edit', buyId], {
      relativeTo: this.activatedRoute,
    });
  }

  onCancel(buyId: string) {
    this.buyService.getBuyById(buyId).subscribe(<Buy>(buyCancel) => {
      buyCancel['cancel'] = true;
      // console.log(buyCancel);
      this.buyService.updateBuy(buyId, buyCancel).subscribe(
        (data) => {
          console.log('success', data);
          window.location.reload();
        },
        (error) => console.log('error', error)
      );
    });
  }

  onDelete(buyId: string) {
    this.buyService.deleteBuy(buyId).subscribe(
      (data) => {
        console.log('success', data);
        window.location.reload();
      },
      (error) => console.log('error', error)
    );
  }
}
