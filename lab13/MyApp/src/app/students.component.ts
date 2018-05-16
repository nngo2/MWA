import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service';

@Component({
  selector: 'app-students',
  template: `
    <ul>
      <li *ngFor = "let student of students">
        <a class="nav-link" routerLink="/profile/{{student.id}}">{{student.name}}</a>
      </li>
    </ul>
    <router-outlet></router-outlet>    
  `,
  styles: []
})
export class StudentsComponent implements OnInit {
  private students : any[];

  constructor(private studentService : StudentService) { }

  ngOnInit() {
    this.students = this.studentService.getData();
  }

}
