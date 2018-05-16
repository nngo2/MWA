import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { StudentsComponent } from './students.component';
import { ProfileComponent } from './profile.component';
import { ProfileGuard } from './profile-guard';
import { ErrorPageComponent } from './error-page.component';

const routes: Routes = [
  {
    path: 'homepage',
    component: HomePageComponent
  },
  {
    path: 'students',
    component: StudentsComponent
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [ProfileGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ProfileGuard]
  },    
  {
    path: 'error',
    component: ErrorPageComponent
  },  
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/'
  }  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [ProfileGuard]
})
export class AppRoutingModule { }
