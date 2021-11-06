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
  userList!: Promise<USER[]>;
  constructor(
    private userListService: UserListService,
    private dialog: MatDialog,
    private messageService: SnackMessageService
  ) {}

  ngOnInit(): void {
    this.userList = this.userListService.getAllUsers();
  }
  async createNewUser() {
    try {
      const { success } = await this.openUserModal();
      if (success) {
        // ! JSON SERVER DOES NOT RETURN ID ON REGISTER USER
        // ! FOR THIS REASON LIST MUST BE REFRESH BY CALLING  API AGAIN
        this.userList = this.userListService.getAllUsers();
      }
    } catch (error: any) {
      this.messageService.show({
        message: error?.message || 'An error occoured when creating new user',
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
