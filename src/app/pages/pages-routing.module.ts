import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// GUARDS
import { AdminGuard } from '@core/guards';
// PARENT
import { PagesComponent } from './pages.component';
// PAGES
import { HomeComponent as HomePage } from './home/home.component';
import { UserListComponent as UserListPage } from './user-list/user-list.component';
const routes: Routes = [
  {
    path: '',

    component: PagesComponent,
    children: [
      { path: 'home',  component: HomePage },
      {
        path: 'user-list',
        component: UserListPage,
        canLoad: [AdminGuard],
        canActivate: [AdminGuard],
      },
      {path:'',pathMatch:'full',redirectTo:'home'}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
