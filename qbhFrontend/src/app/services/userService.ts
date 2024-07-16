import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private apiUrl = 'http://localhost:3000/users/'; // Update with your API URL

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  getUsers(): Observable<any> {
    return this.usersSubject.asObservable();
  }

  loadUsers(): void {
    this.http.get<any>(this.apiUrl).subscribe(users => {
      this.usersSubject.next(users);
    });
  }

  
  addUser(user: any): Observable<any[]> {
    const updateUrl = this.apiUrl + "update";
    const url = user.id ? updateUrl : this.apiUrl;
    return Observable.create((observer: { next: (arg0: any) => void; complete: () => void; }) => {
      this.http[user.id ? 'put' : 'post']<any>(this.apiUrl, user)
        .subscribe(contentData => {
          observer.next(contentData);
          observer.complete();
        });
    });
    
  }

  getUserById(userId: number): Observable<any[]> {
    const undefinedrl = this.apiUrl + "/" + userId;
    return Observable.create((observer: { next: (arg0: any) => void; complete: () => void; }) => {
      this.http.get<any>(this.apiUrl)
        .subscribe(contentData => {
          observer.next(contentData);
          observer.complete();
        });
    });
    
  }



  // saveBank(toSaveBankdata): Observable<any> {
  //   const url = toSaveBankdata.id ? NEW_UPDATE_BANK : NEW_SAVE_BANK;
  //   const options = this.fs.getNestJSHttpOptionsDB();
  //   return this.http[toSaveBankdata.id ? 'put' : 'post'](url, toSaveBankdata, options).pipe();
  // }
  // getNestJSHttpOptionsDB(): object {
  //   const options = {
  //     withCredentials: true,
  //     headers: this.getNestJSHttpHeadersDB()
  //   };
  //   return options;
  // }

  // getNestJSHttpHeadersDB() {
  //   // TODO need to set dynamic schema
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Content-Type', 'application/json')
  //     .append('Authorization', 'Bearer ' + localStorage.getItem('X-QQ-Auth-token'))
  //     .append('Access-Control-Allow-Origin', '*')
  //     .append('id', localStorage.getItem('id') == null ? '' : localStorage.getItem('id'));
  //   return headers;
  // }













//   updateUser(user: any): void {
//     this.http.put<any>(`${this.apiUrl}/${user.id}`, user).subscribe(updatedUser => {
//       const currentUsers = this.usersSubject.getValue().map(cdu =>
//         u.id === updatedUser.id ? updatedUser : u
//       );
//       this.usersSubject.next(currentUsers);
//     });
//   }

  deleteUser(userId: string): void {
    this.http.delete(`${this.apiUrl}/${userId}`).subscribe(() => {
      const currentUsers = this.usersSubject.getValue().filter((user: { id: string; }) => user.id !== userId);
      this.usersSubject.next(currentUsers);
    });
  }
}
