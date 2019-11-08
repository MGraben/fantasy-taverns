import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { TavernsComponent } from './taverns.component';
import { MyTavernComponent } from './my-tavern/my-tavern.component';
// import { AuthGuard } from './common/auth/auth.guard';


const appRoutes: Routes = [
    { path: 'taverns', component: TavernsComponent },
    { path: 'my-taverns', component: MyTavernComponent },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(appRoutes)],
})
export class TavernsRoutingModule {}
