import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// shared
import { HeaderComponent } from './components/shared/header/header.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SpacerComponent } from './components/shared/spacer/spacer.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
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

@NgModule({
  declarations: [
    AppComponent,
    // shared
    HeaderComponent,
    NavbarComponent,
    SpacerComponent,
    FooterComponent,
    NotFoundComponent,
    // customer
    CustomerComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    OneCustomerComponent,
    // salesperson
    SalespersonComponent,
    AddSalespersonComponent,
    EditSalespersonComponent,
    OneSalespersonComponent,
    // employee
    EmployeeComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    // product
    ProductComponent,
    AddProductComponent,
    EditProductComponent,
    OneProductComponent,
    // buy
    BuyComponent,
    AddBuyComponent,
    EditBuyComponent,
    // report
    ReportComponent,
    OneEmployeeComponent,
    AddReportComponent,
    EditReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
