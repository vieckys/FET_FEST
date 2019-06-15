import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ServerResponse } from 'src/app/models/response.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChildService {
  url = `${environment.API_ENDPOINT}children/`;

  constructor(private http: HttpClient, private router: Router) {}

  add(postData) {
    this.http.post(`${this.url}`, postData).subscribe(res => {
      this.router.navigate(['/dashboard']);
      console.log(res);
    });
  }

  update(postData) {
    this.http.put(`${this.url}`, postData).subscribe(res => {
      this.router.navigate(['/dashboard']);
      return res;
    });
  }

  getAll(postData): Observable<any> {
    return this.http.post(`${this.url}byUser/${postData.id}`, postData).pipe(
      map((res: ServerResponse) => {
        return res.data;
      })
    );
  }

  editChild(postData): Observable<any> {
    return this.http.post(`${this.url}byUser`, postData).pipe(
      map((res: Response) => {
        return res;
      }),
      catchError(d => d)
    );
  }
}
