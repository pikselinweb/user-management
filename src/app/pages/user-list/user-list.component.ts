import { Component, OnInit } from '@angular/core';
// SERVICES
import { UserListService } from '@core/services/auth';
// MODELS
import { USER } from '@models/auth';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  userList!: Promise<USER[]>;
  constructor(private userListService: UserListService) {}

  ngOnInit(): void {
    this.userList = this.userListService.getAllUsers();
  }
}
