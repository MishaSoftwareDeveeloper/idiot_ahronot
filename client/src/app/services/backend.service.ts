import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import {throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("token") ? sessionStorage.getItem("token"):''
         
        })
    };
  constructor(private http: HttpClient) {}
  get(path) {
      return this.http.get(`api/${path}`, this.httpOptions );
  }


  insert(path, user: any) {
      return this.http.post(`api/${path}`, user, this.httpOptions).pipe(
          catchError((error:any) => {
             
              if (error.status == 404) {
                  sessionStorage.clear();
              }
                  
              return throwError(error);
          })
      );
  }
  addAlbum(userId, albums) {
      var dataTosend = { userId: userId, albums: albums };
 
      return this.http.post(`api/Albums`, dataTosend, this.httpOptions)
  }

  update(path,user: any) {
      return this.http.put(`api/${path}` + user.id, user, this.httpOptions);
  }

  delete(path, id) {
      return this.http.delete(`api/${path}/` + id, this.httpOptions)
  }

}
