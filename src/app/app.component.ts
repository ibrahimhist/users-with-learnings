import { Component, OnInit } from '@angular/core';
import { LearningService } from './shared/services/learning/learning.service';
import { UserService } from './shared/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'users-with-learnings';

  constructor(
    private userService: UserService,
    private learningService: LearningService
  ) {}

  ngOnInit(): void {
    // initial users
    this.userService.getAndSetUsers();
    this.learningService.getAndSetLearnings();
  }
}
