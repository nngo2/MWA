import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { StudentService } from './student.service';

@Injectable()
export class ProfileGuard implements CanActivate {
    constructor(private studentService: StudentService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        console.dir(route);
        console.dir(state);
        const id = route.params['id'];
        const student = this.studentService.findById(id);
        if (!student) {
            this.router.navigate(['/error']);
            return false;
        }
        return true;
    }
}
