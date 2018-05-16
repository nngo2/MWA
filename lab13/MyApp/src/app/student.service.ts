import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students : any[] = [{id: 1, name: 'Asaad Saad', stuId: '12345', email: 'asaad@num.edu'}];

  constructor() { }

  public getData() : any[] {
    return this.students;
  }

  public findById(id: number) : any {
    return this.students.find(s => s.id == id);
  }
}
