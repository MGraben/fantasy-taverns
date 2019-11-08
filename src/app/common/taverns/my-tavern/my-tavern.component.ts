import { Component, OnInit } from '@angular/core';
import { TavernsService, IMyTavern } from '../taverns.service';

@Component({
    templateUrl: './my-tavern.component.html',
})
export class MyTavernComponent implements OnInit {
    Mytaverns: IMyTavern[];

    constructor(private tavernService: TavernsService) {}

    ngOnInit(): void {
        this.tavernService.getMyAll().subscribe((tavern) => (this.Mytaverns = tavern));
    }
}
