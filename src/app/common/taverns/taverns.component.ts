import { Component, OnInit } from '@angular/core';
import { TavernService, ITavern } from './taverns.service';

@Component({
    templateUrl: './taverns.component.html',
})
export class TavernsComponent implements OnInit {
    taverns: ITavern[];

    constructor(private tavernsService: TavernService) {}

    ngOnInit(): void {
        this.tavernsService.getAll().subscribe((taverns) => (this.taverns = taverns));
    }
}
