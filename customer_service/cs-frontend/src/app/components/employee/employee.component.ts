import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { EmployeeService } from 'src/app/service/employee.service';
import Employee from 'src/app/models/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faSearch = faSearch;

  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.employeeService.getEmployees().subscribe((employees: Employee[]) => {
      return (this.employees = employees);
    });
  }

  onCreate() {
    this.router.navigate(['./add'], {
      relativeTo: this.activatedRoute,
    });
  }

  onEdit(emplUsername: string) {
    // console.log(emplUsername);
    this.router.navigate(['./edit', emplUsername], {
      relativeTo: this.activatedRoute,
    });
  }

  onDelete(emplUsername: string) {
    this.employeeService.deleteEmployee(emplUsername).subscribe(
      (data) => {
        console.log('success', data);
        window.location.reload();
      },
      (error) => console.log('error', error)
    );
  }

  onLookup(emplUsername: string) {
    this.router.navigate(['./lookup', emplUsername], {
      relativeTo: this.activatedRoute,
    });
  }
}
