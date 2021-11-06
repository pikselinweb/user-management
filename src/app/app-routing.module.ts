import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// ROUTER GUARDS
import { LoginGuard, NotLoginGuard } from '@core/guards';
const routes: Routes = [

  {
    path: 'auth',
    canActivate: [NotLoginGuard],
    canLoad: [NotLoginGuard],
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./pages/error-pages/error-pages.module').then(
        (m) => m.ErrorPagesModule
      ),
  },
  {
    path: '',
    canActivate: [LoginGuard],
    canLoad: [LoginGuard],
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },

  // WRONG URL REDIRECT TO 404
  // { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: 'error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
