import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearningsComponent } from './pages/learnings/learnings.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'learnings',
    component: LearningsComponent,
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
