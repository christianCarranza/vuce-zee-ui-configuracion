import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { FormRoleMenuComponent } from './form-role-menu/form-role-menu.component';

const routes: Routes = [
  {path: 'role-menu', component: FormRoleMenuComponent},
  {path: '', component: FormRoleMenuComponent},
  { path: '**', component: EmptyRouteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/vuce-zee-mf/configuracion/' }],
})
export class AppRoutingModule { }
