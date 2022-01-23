import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavigationMenu } from '@app/shared/models/navigation-menu.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  navigationMenuList?: NavigationMenu[];
  logoUrl = '/';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.navigationMenuList = [
      { link: '/users', text: 'Users' },
      { link: '/learnings', text: 'Learnings' },
    ];
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }
}
