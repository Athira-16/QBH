import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/userService';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input()  userAdded: User[] =[];
  @Output() editUser = new EventEmitter<number>();
  // @Output() deleteUser = new EventEmitter<User>();
  userData:any;

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(){
    console.log("user==>", this.userAdded);
  }

  // onDisplayUser(userData: []){
  //     this.userData = userData;
  //     console.log("userData==>", userData);
  // }


  onEditUser(userId: number) {
    this.editUser.emit(userId);
    console.log(userId);
  }

  onDeleteUser(user: User) {
    console.log('Delete user', user);
  }

  generatePdf(userData: any): Observable<Blob> {
    const apiUrl = 'http://localhost:3000/pdf/generate/' + userData;
    return this.http.get(apiUrl, { responseType: 'blob' });
  }

  downloadPdf(userId:number): void {
    const userData = this.userService.getUserById(userId);
    this.generatePdf(userData).subscribe(
      (response: BlobPart) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        saveAs(blob, 'user-data.pdf');
      },
      (error: any) => {
        console.error('Error generating PDF', error);
      }
    );
  }

}


function saveAs(blob: Blob, arg1: string) {
  throw new Error('Function not implemented.');
}

