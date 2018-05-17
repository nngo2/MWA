import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { Observable } from "rxjs/Rx";
import { PostService } from '../post.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm: FormGroup;

  userData: any;
  postData: any;

  get name() {return this.userForm.get('name');}
  get email() {return this.userForm.get('email');}  
  get post() {return this.userForm.get('post');}  

  constructor(private formBuilder: FormBuilder, private _postService: PostService) { 
    this.userForm = formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      post: ['', [Validators.minLength(10)]]
    });
  }

  ngOnInit() {
  }

  getData() {
    this._postService.getData().subscribe(
      data => {
        this.userData = data[0];
        this.postData = data[1];
      },
      err => console.dir(err),
      () => {
        console.dir(this.userData);
        console.dir(this.postData);        
      }
    );
  }

  onSubmit() {
    console.log(this.userForm.value);
  }

}
