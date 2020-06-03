import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { CustomerService } from 'src/app/service/customer.service';
import Customer from 'src/app/models/customer.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faSearch = faSearch;

  customers: Customer[] = [];

  constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.customerService.getCustomers().subscribe((customers: Customer[]) => {
      return (this.customers = customers);
    });
  }

  onCreate() {
    this.router.navigate(['./add'], {
      relativeTo: this.activatedRoute,
    });
  }

  onEdit(custUsername: string) {
    // console.log(custUsername);
    this.router.navigate(['./edit', custUsername], {
      relativeTo: this.activatedRoute,
    });
  }

  onDelete(custUsername: string) {
    this.customerService.deleteCustomer(custUsername).subscribe(
      (data) => {
        console.log('success', data);
        window.location.reload();
      },
      (error) => console.log('error', error)
    );
  }

  onLookup(custUsername: string) {
    this.router.navigate(['./lookup', custUsername], {
      relativeTo: this.activatedRoute,
    });
  }
}
