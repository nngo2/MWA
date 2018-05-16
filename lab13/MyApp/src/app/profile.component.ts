import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { StudentService } from './student.service';

@Component({
  selector: 'app-profile',
  template: `
    <p>
      Name: {{student.name}}
    </p>
    <p>
      Student Id: {{student.stuId}}
    </p>    
    <p>
      Email: {{student.email}}
    </p>    
  `,
  styles: []
})
export class ProfileComponent implements OnInit {
  private subscription: Subscription;
  private id: number;
  public student: any;

  constructor(private route: ActivatedRoute, private studentService: StudentService) {
    this.subscription = this.route.params.subscribe(params => { this.id = params['id']; });
  }

  ngOnInit() {
    this.student = this.studentService.findById(this.id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
