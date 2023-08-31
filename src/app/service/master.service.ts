import { Injectable } from '@angular/core';
import { Country, Customer } from '../Model/Customer';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  private headers: HttpHeaders;

  constructor(private http: HttpClient, private router: Router) {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('firebaseToken')}`,
    });
  }

  GetColorList() {
    return [
      { code: 'c0', name: 'green' },
      { code: 'c1', name: 'Red' },
      { code: 'c2', name: 'Green' },
      { code: 'c3', name: 'Yellow' },
      { code: 'c4', name: 'White' },
    ];
  }

  GetCustomer(payload: any): Observable<any> {
    return this.http.get('http://localhost:3000/course/', {
      headers: this.headers,
      params: payload,
    });
  }

  search(key: any): Observable<any> {
    return this.http.get(`http://localhost:3000/course/`, {
      headers: this.headers,
      params: { title: key },
    });
  }

  editdata(data: any) {
    return this.http.patch(
      `http://localhost:3000/course/updatecourse/${data.id}`,
      data,
      { headers: this.headers }
    );
  }

  deletecourse(data: any) {
    return this.http.delete(
      `http://localhost:3000/course/deletecourse/${data}`,
      { headers: this.headers }
    );
  }

  Savecustomer(data: any) {
    return this.http.patch(
      `http://localhost:3000/course/updatecourse/${data.id}`,
      data,
      { headers: this.headers }
    );
  }

  addcourse(data: any) {
    return this.http.post(`http://localhost:3000/course/addcourse/`, data, {
      headers: this.headers,
    });
  }

  GetCustomerbycode(code: any) {
    return this.http.get(`http://localhost:3000/course/${code}`, {
      headers: this.headers,
    });
  }

  register(data: any) {
    return this.http.post('http://localhost:3000/auth/signup/', data, {
      headers: this.headers,
    });
  }

  GetAssociate() {
    return this.http.get('http://localhost:3000/associate', {
      headers: this.headers,
    });
  }

  GetAssociatebycode(code: any) {
    return this.http.get(`http://localhost:3000/associate/${code}`, {
      headers: this.headers,
    });
  }

  GetCountry(): Observable<Country[]> {
    return this.http.get<Country[]>('http://localhost:3000/country', {
      headers: this.headers,
    });
  }

  SaveAssociate(data: any, code: any) {
    return this.http.put(`http://localhost:3000/associate/${code}`, data, {
      headers: this.headers,
    });
  }
}
