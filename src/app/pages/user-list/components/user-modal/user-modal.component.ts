import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserListService } from '@core/services/auth';
// MODELS
import { PROFILE } from '@models/auth';
@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {
  constructor(
    private userListService: UserListService,
    private dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PROFILE
  ) {}
  async save(formData: any) {
    const { success, user } = this.data
      ? await this.userListService.updateUser({
          ...this.data,
          fullName: formData?.fullName,
          role: formData?.role,
        })
      : await this.userListService.addNewUser(formData);
    if (success) {
      this.dialogRef.close({ success: true, userData: user });
    }
  }
  ngOnInit(): void {}
}
