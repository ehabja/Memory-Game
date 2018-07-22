import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatrixComponent } from './matrix/matrix.component';
import { ScoreComponent } from './score/score.component';

const appRoutes: Routes = [
    { path: "home", component: MatrixComponent},
    { path: "score", component: ScoreComponent},
    { path: "", redirectTo: "/home", pathMatch: "full" }
    
]

@NgModule({
  imports: [
      RouterModule.forRoot(appRoutes) 
  ]
})
export class AppRoutingModule { }
