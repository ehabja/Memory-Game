import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CellComponent } from './cell/cell.component';
import { MatrixComponent } from './matrix/matrix.component';
import { ScoreComponent } from './score/score.component';
import { RouterModule } from '../../node_modules/@angular/router';
import { AppRoutingModule } from './app-routing.module';
import "rxjs";
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { ScoreService } from './shared/services/score.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatInputModule, MatButtonModule, MatCheckboxModule, MatIconModule } from "@angular/material";



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CellComponent,
    MatrixComponent,
    ScoreComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [ScoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
