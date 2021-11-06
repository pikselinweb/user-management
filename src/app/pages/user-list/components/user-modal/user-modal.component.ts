import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserListService } from '@core/services/auth';
// MODELS
import { USER } from '@models/auth';
@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {
  constructor(
    private userListService: UserListService,
    private dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: USER
  ) {}
  async save(formData: any) {
    const succed = this.data
      ? // ! JSON SERVER AUTH NOT ALLOW UPDATE FOR USERS SCHEMA
        // ! FOR THIS REASON DB WONT BE UPDATE
        // ! AFTER REFRESHING CHANGES WILL BE LOST
        // await this.userListService.updateUser({
        //     ...formData,
        //     id: this.data?.id,
        //   })
        true
      : await this.userListService.addNewUser(formData);
    if (succed) {
      this.dialogRef.close({ success: true, userData: formData });
    }
  }
  ngOnInit(): void {}
}
