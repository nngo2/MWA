import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs/observable/forkJoin';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private userUrl : string = 'http://jsonplaceholder.typicode.com/users/1'; 
  private postUrl : string = 'http://jsonplaceholder.typicode.com/posts?userId=1'; 
  
  constructor(private httpClient : HttpClient) { }

  getData()  {
    return forkJoin(
      this.httpClient.get(this.userUrl),
      this.httpClient.get(this.postUrl)
    );
  }
}
