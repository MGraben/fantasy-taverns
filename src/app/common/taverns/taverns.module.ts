import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { CommonModule } from '@angular/common';
import { TavernsRoutingModule } from './taverns-routing.module';
import { TavernsComponent } from './taverns.component';


@NgModule({
    declarations: [TavernsComponent],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        TavernsRoutingModule,
    ],

})
export class TavernsModule {}
