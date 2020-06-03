import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { ProductService } from 'src/app/service/product.service';
import Product from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faSearch = faSearch;

  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      return (this.products = products);
    });
  }

  onCreate() {
    this.router.navigate(['./add'], {
      relativeTo: this.activatedRoute,
    });
  }

  onEdit(pdtId: string) {
    // console.log(pdtId);
    this.router.navigate(['./edit', pdtId], {
      relativeTo: this.activatedRoute,
    });
  }

  onDelete(pdtId: string) {
    this.productService.deleteProduct(pdtId).subscribe(
      (data) => {
        console.log('success', data);
        window.location.reload();
      },
      (error) => console.log('error', error)
    );
  }

  onLookup(pdtId: string) {
    this.router.navigate(['./lookup', pdtId], {
      relativeTo: this.activatedRoute,
    });
  }
}
