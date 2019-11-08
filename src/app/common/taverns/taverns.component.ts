import { Component, OnInit } from '@angular/core';
import { TavernsService, ITavern } from './taverns.service';

@Component({
    templateUrl: './taverns.component.html',
})
export class TavernsComponent implements OnInit {
    taverns: ITavern[];

    constructor(private tavernsService: TavernsService) {}

    ngOnInit(): void {
        this.tavernsService.getAll().subscribe((taverns) => (this.taverns = taverns));
    }

   
}
console.log('taverns.componte.ts');
