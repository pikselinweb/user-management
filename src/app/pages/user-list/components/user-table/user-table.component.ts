import { Component, OnInit, Input } from '@angular/core';
import { USER } from '@models/auth';

@Component({
  selector: 'user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
  private readonly userRoles = ['Unknown', 'User', 'Admin', 'Super Admin'];
  @Input() userList!: USER[];
  constructor() {}

  ngOnInit(): void {}
  visualizeUserRole(roleIndex: number | undefined): string {
    return this.userRoles[roleIndex ? roleIndex : 0];
  }
  // FOR LOOP PERFORMANCE
  trackByFn(index: number, user: USER): number {
    return user?.id;
  }
}
