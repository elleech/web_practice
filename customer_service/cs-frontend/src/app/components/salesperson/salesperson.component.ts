import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { SalespersonService } from 'src/app/service/salesperson.service';
import Salesperson from 'src/app/models/salesperson.model';

@Component({
  selector: 'app-salesperson',
  templateUrl: './salesperson.component.html',
  styleUrls: ['./salesperson.component.css'],
})
export class SalespersonComponent implements OnInit {
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faSearch = faSearch;

  salespeople: Salesperson[] = [];

  constructor(
    private salespersonService: SalespersonService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.salespersonService
      .getSalespeople()
      .subscribe((salespeople: Salesperson[]) => {
        return (this.salespeople = salespeople);
      });
  }

  onCreate() {
    this.router.navigate(['./add'], {
      relativeTo: this.activatedRoute,
    });
  }

  onEdit(saleUsername: string) {
    // console.log(saleUsername);
    this.router.navigate(['./edit', saleUsername], {
      relativeTo: this.activatedRoute,
    });
  }

  onDelete(saleUsername: string) {
    this.salespersonService.deleteSalesperson(saleUsername).subscribe(
      (data) => {
        console.log('success', data);
        window.location.reload();
      },
      (error) => console.log('error', error)
    );
  }

  onLookup(saleUsername: string) {
    this.router.navigate(['./lookup', saleUsername], {
      relativeTo: this.activatedRoute,
    });
  }
}
