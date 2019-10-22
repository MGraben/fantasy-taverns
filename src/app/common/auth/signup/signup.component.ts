import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    templateUrl: './signup.component.html',
})
export class SignupComponent {
    userName = '';
    password = '';
    tavernName = '';
    
    constructor(private router: Router, private authService: AuthService) {}

    signup(): void {
        this.authService.create(this.userName, this.password).subscribe(
            // (response) => {
            //     if (response.success) {
            //         console.log('successful signup');
            //         this.router.navigateByUrl('/home');
            //     }
            // },
            // (error) => {
            //     console.log('signup failed');
            // },
        );
        
        console.log('Username: ' + this.userName);
        console.log('Password: ' + this.password);
    }
    cancel(): void {
        this.router.navigateByUrl('/home');
    }
}
