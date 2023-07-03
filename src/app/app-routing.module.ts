import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SelectionComponent } from './components/selection/selection.component';
import { ReviewComponent } from './components/review/review.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [

  { path: '', component: LoginComponent },

  { path: 'home', component: HomeComponent },

  { path: 'selection', component: SelectionComponent },

  { path: 'review', component: ReviewComponent },

  { path: 'confirmation', component: ConfirmationComponent },

  //REdirecting to the Home page, if the provided URL doesn't exist
  { path: '**', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
