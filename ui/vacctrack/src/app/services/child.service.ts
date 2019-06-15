import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChildService {
  url = `${environment.API_ENDPOINT}children/`;

  constructor(private http: HttpClient) { }

  add(postData) {
    this.http.post(`${this.url}`, postData).subscribe(res => {
      console.log(res);
    });
  }
}
