import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';

const routes: Routes = [
  {
    path: '',
    component: NewsComponent,
    children: [
      { path: '', component: NewsListComponent, pathMatch: 'full' },
      { path: ':category/:url', component: NewsDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsRoutingModule {}
