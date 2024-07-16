import { Component } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {
   users: User[] = [];
   userEditedId: number | null = null;

  addUser(user: User) {
    this.users.push(user);
  }

  onEditUser(userId: number) {
    this.userEditedId = userId;
  }
  
    onSaveEditedUser(editedUser: User) {
      const index = this.users.findIndex(u => u.id === editedUser.id);
      if (index !== -1) {
        this.users[index] = editedUser;
        // this.editedUser = null; // Clear editedUser after saving
      }
    }
  
    onCancelEdit() {
      // this.editedUser = null; // Clear editedUser on cancel
    }
  
    onDeleteUser(user: User) {
      // Implement delete logic here
    }
  
    onUserAdded(user: User) {
      this.users.push(user);
    }
  }

