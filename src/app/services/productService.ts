import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  
  apiUrl: String = "http://localhost:3000/api/products";
  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(`${this.apiUrl}`, { headers }).pipe(
        map((response) => {
            return response;
          }),
        catchError(error => {
        console.error(error)
        throw 'Error in getProducts API call';
      })
    );
  }

  getProductById(productId: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(`${this.apiUrl}/${productId}`, { headers }).pipe(
        map((response) => {
            return response;
          }),
        catchError(error => {
        console.error(error)
        throw 'Error in getProductById API call';
      })
    );
  }

  createProduct(data: Object): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}`, data, { headers }).pipe(
        map((response) => {
            return response;
          }),
        catchError(error => {
        console.error(error)
        throw 'Error in createProduct API call';
      })
    );
  }

  updateProduct(productId: string, data: Object): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch<any>(`${this.apiUrl}/${productId}`, data, { headers }).pipe(
        map((response) => {
            return response;
          }),
        catchError(error => {
        console.error(error)
        throw 'Error in updateProduct API call';
      })
    );
  }

  deleteProduct(productId: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<any>(`${this.apiUrl}/${productId}`, { headers }).pipe(
        map((response) => {
            return response;
          }),
        catchError(error => {
        console.error(error)
        throw 'Error in deleteProduct API call';
      })
    );
  }

}