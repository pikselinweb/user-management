import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// PARENT COMPONENT
import { AuthComponent } from './auth.component';
// CHILD COMPONENTS
import { LoginPage, RegisterPage } from './contents';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      // SET DEFAULT LOGIN PAGE
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      // LOGIN AND REGISTER PAGES
      { path: 'login', component: LoginPage },
      { path: 'register', component: RegisterPage },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
