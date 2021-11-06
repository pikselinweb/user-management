import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// SERVICES
import { UserListService } from '@core/services/auth';
import { SnackMessageService } from '@core/services/notifcation';
// MODELS
import { USER } from '@models/auth';
import { UserModal } from './components';
// COMP
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  userList!: USER[];
  constructor(
    private userListService: UserListService,
    private dialog: MatDialog,
    private messageService: SnackMessageService
  ) {}

  async ngOnInit() {
    this.userList = await this.userListService.getAllUsers();
  }
  async createNewUser() {
    try {
      const { success } = await this.openUserModal();
      if (success) {
        // ! JSON SERVER DOES NOT RETURN ID ON REGISTER USER
        // ! FOR THIS REASON LIST MUST BE REFRESH BY CALLING  API AGAIN
        this.userList = await this.userListService.getAllUsers();
      }
    } catch (error: any) {
      this.messageService.show({
        message: error?.message || 'An error occoured when creating new user',
      });
    }
  }
  // ! JSON SERVER AUTH NOT ALLOW UPDATE FOR USERS SCHEMA
  // ! FOR THIS REASON DB WONT BE UPDATE
  // ! AFTER REFRESHING CHANGES WILL BE LOST
  async updateUser(user: USER) {
    try {
      const { success, userData } = await this.openUserModal(user);
      if (success) {
        const userIndex = this.userList.findIndex(
          (usr) => usr?.id === user?.id
        );
        if (userIndex >= 0) {
          this.userList[userIndex] = userData;
          this.messageService.show({
            message:
              'User has been updated successfuly but changes wont save to db. JSON SERVER AUTH package does not support push method',
            duration: 4000,
          });
        }
      }
    } catch (error: any) {
      this.messageService.show({
        message: error?.message || 'An error occoured when updating  user',
      });
    }
  }
  private async openUserModal(user?: USER) {
    const userDialog = this.dialog.open(UserModal, {
      width: '450px',
      maxWidth: '100%',
      data: user,
      disableClose: true,
    });
    return await userDialog.afterClosed().toPromise();
  }
}
