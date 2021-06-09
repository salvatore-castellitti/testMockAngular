import { Injectable } from '@angular/core';
import {User} from "./user.model";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {UsersModule} from "./users.module";
@Injectable({
  providedIn: 'root'
})
export class UserService{
  private userUrl = 'api/users';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.userUrl).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) =>{
        console.error(error);
        return throwError(error);
      })
    );
  }
  createUser(user: User):Observable<User>{
    user.id=null;
    return this.http.post<User>(this.userUrl, user).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    )
  }

  editProduct(user: User): Observable<any>{
    return this.http.put(this.userUrl + user.id, user);
  }

  deleteUser(id: number): Observable<any>{
    return this.http.delete(this.userUrl + id)
  }


}
