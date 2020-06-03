import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// customer
import { CustomerComponent } from './components/customer/customer.component';
import { AddCustomerComponent } from './components/customer/add-customer/add-customer.component';
import { EditCustomerComponent } from './components/customer/edit-customer/edit-customer.component';
import { OneCustomerComponent } from './components/customer/one-customer/one-customer.component';
// salesperson
import { SalespersonComponent } from './components/salesperson/salesperson.component';
import { AddSalespersonComponent } from './components/salesperson/add-salesperson/add-salesperson.component';
import { EditSalespersonComponent } from './components/salesperson/edit-salesperson/edit-salesperson.component';
import { OneSalespersonComponent } from './components/salesperson/one-salesperson/one-salesperson.component';
// employee
import { EmployeeComponent } from './components/employee/employee.component';
import { AddEmployeeComponent } from './components/employee/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/employee/edit-employee/edit-employee.component';
import { OneEmployeeComponent } from './components/employee/one-employee/one-employee.component';
// product
import { ProductComponent } from './components/product/product.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { EditProductComponent } from './components/product/edit-product/edit-product.component';
import { OneProductComponent } from './components/product/one-product/one-product.component';
// buy
import { BuyComponent } from './components/buy/buy.component';
import { AddBuyComponent } from './components/buy/add-buy/add-buy.component';
import { EditBuyComponent } from './components/buy/edit-buy/edit-buy.component';
// report
import { ReportComponent } from './components/report/report.component';
import { AddReportComponent } from './components/report/add-report/add-report.component';
import { EditReportComponent } from './components/report/edit-report/edit-report.component';
// not found
import { NotFoundComponent } from './components/shared/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'reports', pathMatch: 'full' },
  // customer
  { path: 'customers', component: CustomerComponent },
  { path: 'customers/add', component: AddCustomerComponent },
  { path: 'customers/edit/:custUsername', component: EditCustomerComponent },
  { path: 'customers/lookup/:custUsername', component: OneCustomerComponent },
  // salesperson
  { path: 'salespeople', component: SalespersonComponent },
  { path: 'salespeople/add', component: AddSalespersonComponent },
  {
    path: 'salespeople/edit/:saleUsername',
    component: EditSalespersonComponent,
  },
  {
    path: 'salespeople/lookup/:saleUsername',
    component: OneSalespersonComponent,
  },
  // employee
  { path: 'employees', component: EmployeeComponent },
  { path: 'employees/add', component: AddEmployeeComponent },
  { path: 'employees/edit/:emplUsername', component: EditEmployeeComponent },
  { path: 'employees/lookup/:emplUsername', component: OneEmployeeComponent },
  // product
  { path: 'products', component: ProductComponent },
  { path: 'products/add', component: AddProductComponent },
  { path: 'products/edit/:pdtId', component: EditProductComponent },
  { path: 'products/lookup/:pdtId', component: OneProductComponent },
  // buy
  { path: 'buys', component: BuyComponent },
  { path: 'buys/add', component: AddBuyComponent },
  { path: 'buys/edit/:buyId', component: EditBuyComponent },
  // report
  { path: 'reports', component: ReportComponent },
  { path: 'reports/add', component: AddReportComponent },
  { path: 'reports/edit/:rptId', component: EditReportComponent },
  // not found
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
