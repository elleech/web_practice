import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import Report from '../models/report.model';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private webService: WebService) {}

  getReports() {
    return this.webService.get('/reports');
  }

  getReportById(rptId: string) {
    return this.webService.get(`/reports/search?rptId=${rptId}`);
  }

  getReportByBuy(buyId: string) {
    return this.webService.get(`/reports/search?buyId=${buyId}`);
  }

  getReportByEmployee(emplUsername: string) {
    return this.webService.get(`/reports/search?emplUsername=${emplUsername}`);
  }

  createReport(report: Report) {
    return this.webService.create<Report>('/reports', report);
  }

  updateReport(rptId: string, report: Report) {
    return this.webService.update<Report>(`/reports/${rptId}`, report);
  }

  deleteReport(rptId: string) {
    return this.webService.delete(`/reports/${rptId}`);
  }
}
