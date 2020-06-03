import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import Employee from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private webService: WebService) {}

  getEmployees() {
    return this.webService.get('/employees');
  }

  getEmployee(emplUsername: string) {
    return this.webService.get(`/employees/${emplUsername}`);
  }

  createEmployee(employee: Employee) {
    return this.webService.create<Employee>('/employees', employee);
  }

  updateEmployee(emplUsername: string, employee: Employee) {
    return this.webService.update<Employee>(
      `/employees/${emplUsername}`,
      employee
    );
  }

  deleteEmployee(emplUsername: string) {
    return this.webService.delete(`/employees/${emplUsername}`);
  }
}
