import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// ROUTER GUARDS
import { LoginGuard, NotLoginGuard } from '@core/guards';
const routes: Routes = [
  {
    path: '',
    canActivate: [LoginGuard],
    canLoad: [LoginGuard],
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: 'auth',
    canActivate: [NotLoginGuard],
    canLoad: [NotLoginGuard],
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  // WRONG URL REDIRECT TO LOGIN
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
