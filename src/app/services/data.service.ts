import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  getRecord(url: string, params: any) {
    return this.http.get(this.baseUrl + url, params);
  }
  post(url: string, params: any) {
    return this.http.post(this.baseUrl + url, params);
  }
  update(url: string, params: any) {
    return this.http.put(this.baseUrl + url, params);
  }
  delete(url: string, params: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: params
    };
    return this.http.delete(this.baseUrl + url, options);
  }
}
