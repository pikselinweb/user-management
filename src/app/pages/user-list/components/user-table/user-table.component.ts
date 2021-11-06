import { Component, OnInit, Input } from '@angular/core';
import { USER } from '@models/auth';

@Component({
  selector: 'user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
  @Input() userList!: USER[];
  constructor() {}

  ngOnInit(): void {}
  // FOR LOOP PERFORMANCE
  trackByFn(index: number, user:USER): number {
    return user?.id;
  }
}
