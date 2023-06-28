import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ReviewComponent } from './components/review/review.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { SelectionComponent } from './components/selection/selection.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SelectionComponent,
    ReviewComponent,
    ConfirmationComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

/*Installation-
npm install bootstrap - [Add @import "../node_modules/bootstrap/dist/css/bootstrap.min.css"; in styles.css]
ng add @angular/material - [Add <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> in index.html]
*/
