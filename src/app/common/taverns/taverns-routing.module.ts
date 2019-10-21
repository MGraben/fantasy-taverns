import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { TavernsComponent } from './taverns.component';
// import { AuthGuard } from './common/auth/auth.guard';


const appRoutes: Routes = [
    { path: 'taverns', component: TavernsComponent },

];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(appRoutes)],
})
export class TavernsRoutingModule {}
