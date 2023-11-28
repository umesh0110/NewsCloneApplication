import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { ContentPageComponent } from './content-page/content-page.component';
import { SearchResultsComponent } from './search-results/search-results.component';

const routes: Routes = [

  {
    path:'',
    component: MainPageComponent
  },
  {
    path:'content',
    component: ContentPageComponent
  },
  {
    path:'search',
    component: SearchResultsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
