import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './common/auth/login/login.component';
import { HomeComponent } from './home.component';
import { AuthGuard } from './common/auth/auth.guard';
import { SignupComponent } from './common/auth/signup/signup.component';
import { TavernsComponent } from './common/taverns/taverns.component';
import { MyTavernComponent } from './common/taverns/my-tavern/my-tavern.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'taverns', component: TavernsComponent},
    { path: 'my-taverns', component: MyTavernComponent},
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: '**', component: HomeComponent, canActivate: [AuthGuard] },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(appRoutes)],
})
export class AppRoutingModule {}
