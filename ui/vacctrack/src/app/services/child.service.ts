import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChildService {
  url = `${environment.API_ENDPOINT}children/`;

  constructor(private http: HttpClient) {}

  add(postData) {
    this.http.post(`${this.url}`, postData).subscribe(res => {
      console.log(res);
    });
  }

  getAll(postData) {
    this.http.post(`${this.url}byUser/${postData.id}`, postData).subscribe(res => {
      console.log(res);
    });;
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
