import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPagesComponent } from './error-pages.component';
// PAGES
import { ForbiddenPage, NotfoundPage } from './contents';
const routes: Routes = [
  {
    path: '',
    component: ErrorPagesComponent,
    children: [

      // 401 AND 404 PAGES
      { path: '401', component: ForbiddenPage },
      { path: '404', component: NotfoundPage },
      // DEFAULT ROUTE
      { path: '', redirectTo: '404',pathMatch:'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorPagesRoutingModule {}
