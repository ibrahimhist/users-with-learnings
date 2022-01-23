import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'users-with-learnings';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // initial users
    this.userService.getAndSetUsers();
  }
}
