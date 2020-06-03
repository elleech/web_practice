import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WebService {
  readonly ROOT_URL: string;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:3000';
  }

  get(url: string) {
    return this.http.get(`${this.ROOT_URL}${url}`);
  }

  create<Object>(url: string, reqBody: Object) {
    return this.http.post(`${this.ROOT_URL}${url}`, reqBody);
  }

  update<Object>(url: string, reqBody: Object) {
    return this.http.put(`${this.ROOT_URL}${url}`, reqBody);
  }

  delete(url: string) {
    return this.http.delete(`${this.ROOT_URL}${url}`);
  }
}
