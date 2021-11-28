import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AntiqueComponent } from './antique/antique.component';

const routes: Routes = [
  {
    path: '',
    component: AntiqueComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
