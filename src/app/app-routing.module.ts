import { NgModule } from '@angular/core';
import { ExtraOptions, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path:'login', component: LoginComponent},
  // {path: 'home', component: HomeComponent},
  {path: 'home', canActivate: [AuthGuard], loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)},
  {path: 'employee', canActivate: [AuthGuard], loadChildren: () => import('./modules/employee/employee.module').then(m => m.EmployeeModule)},
  {path:'unauthorized', component: UnauthorizedComponent}
];

const config: ExtraOptions = {
  useHash: true,
  preloadingStrategy: PreloadAllModules,

}
@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
