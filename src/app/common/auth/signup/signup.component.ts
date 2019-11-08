import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TavernsService, ITavern } from '../../taverns/taverns.service';

@Component({
    templateUrl: './signup.component.html',
})


export class SignupComponent implements OnInit {

    constructor(private router: Router, private authService: AuthService, private tavernsService: TavernsService) {}

    ngOnInit(): void {
        this.tavernsService.getAll().subscribe((taverns) => (this.taverns = taverns));
    }
    userName = '';
    password = '';
    tavernName = '';
    tavernId = 0;
    taverns: ITavern[];
    selectedtavern: ITavern;


    signup(): void {
        // if(this.tavern.Id === 0){
        //     this.authService.create(this.userName, this.password, this.tavernName, this.tavernId).subscribe(
        //         );

        //         console.log('Username Created: ' + this.userName);
        //         console.log('Password Created: ' + this.password);
        //         console.log('TavernName Created: ' + this.tavernName);
        //         console.log('TaverId Created: ' + this.tavernId);
        //         this.router.navigateByUrl('/login');
        // }
        // else {
        //  this.authService.create(this.userName, this.password, this.tavern.TavernName, this.tavern.Id).subscribe(
        //     );           
        // }


        this.authService.create(this.userName, this.password, this.tavernName, this.tavernId).subscribe(
            (response) => {
                if (response.success) {
                    console.log('successful signup');
                    this.router.navigateByUrl('/home');
                }
            },
            (error) => {
                console.log('signup failed');
                console.log(JSON.stringify(error));
            },
        );
        
        console.log('Username Created: ' + this.userName);
        console.log('Password Created: ' + this.password);
        console.log('TavernName selected: ' + this.tavernName);
        // console.log('TaverId Used: ' + this.tavern.Id);
        this.router.navigateByUrl('/login');
    }
    cancel(): void {
        console.log('createUser failed: Signup');
        this.router.navigateByUrl('/signup');
    }
}
