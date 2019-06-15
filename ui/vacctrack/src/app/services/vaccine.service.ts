import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ServerResponse } from 'src/app/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {
  url = `${environment.API_ENDPOINT}vaccination/`;

  constructor(private http: HttpClient) { }

  getAllVaccine(postData): Observable<any> {
    return this.http.post(`${this.url}${postData.id}`, postData).pipe(
      map((res: ServerResponse) => {
        return res.data;
      })
    );
  }
}
