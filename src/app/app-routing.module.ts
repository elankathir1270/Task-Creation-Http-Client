import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthModule } from './login/auth.module';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path : 'dashboard', loadChildren : () => import('./dashboard/dashboard.module').then((mod) => mod.DashboardModule)},
  {path : 'login', loadChildren : () => AuthModule}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy : PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
