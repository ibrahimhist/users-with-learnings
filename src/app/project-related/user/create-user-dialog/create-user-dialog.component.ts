import { Component, Inject, OnInit, Optional } from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '@app/shared/services/user/user.service';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss'],
})
export class CreateUserDialogComponent implements OnInit {
  createUserForm: FormGroup;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    @Optional() public dialogRef: MatDialogRef<CreateUserDialogComponent>,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.createUserForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      avatar: [''],
      email: ['', [Validators.email, Validators.required]],
    });
  }

  onClickedClose(): void {
    this.dialogRef.close();
  }

  onClickedCreate(): void {
    if (this.createUserForm.valid) {
      this.userService
        .createUser(this.createUserForm.value)
        .subscribe((response) => {
          this.dialogRef.close({ success: true });
        });
    }
  }
}
