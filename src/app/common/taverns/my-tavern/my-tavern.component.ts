import { Component, OnInit } from '@angular/core';
import { TavernService, ITavern } from '../taverns.service';        //'../taverns.service';

@Component({
    templateUrl: './taverns/my-tavern.component.html',
})
export class TavernComponent implements OnInit {
    taverns: ITavern[];

    constructor(private tavernsService: TavernService) {}

    ngOnInit(): void {
        this.tavernsService.getAll().subscribe((tavern) => (this.taverns = tavern));
    }
}
