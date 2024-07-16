import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/userService';
import { User } from '../user.model';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @Input() user: User | null = null; 
  @Output() userAdded = new EventEmitter<any>(); 
  @Input('userId') userId: number | null = null;
  

  form: FormGroup;
  editForm: FormGroup | undefined;
  savedFormData:any;

  constructor(private fb: FormBuilder, private userService: UserService, private tableComponent: TableComponent) {

    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      address: ['', Validators.required]
    });
    console.log('useris==>', this.userId);
  }

  ngOnInIt(){
    if(this.userId){
      console.log("userid==>", this.userId);
      this.createEditForm(this.fb);
    }

  }

  createEditForm(fb: FormBuilder) {
    this.editForm = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      address: ['', Validators.required],
      id: [null]
    });
  }


  onSubmit(formValue: any) {
    if (this.userId) {
      this.userService.addUser(formValue).subscribe(updatedUser => {
        this.userAdded.emit(updatedUser);
        this.form.reset();
      });
    } else {
      this.userService.addUser(formValue).subscribe(savedUsers => {
        this.userAdded.emit(savedUsers);
        this.form.reset();
      });
    }
  }
  }

