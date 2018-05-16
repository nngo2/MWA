import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page.component';
import { StudentsComponent } from './students.component';
import { AppRoutingModule } from './app-routing.module.';
import { StudentService } from './student.service';
import { ProfileComponent } from './profile.component';
import { ErrorPageComponent } from './error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    StudentsComponent,
    ProfileComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
