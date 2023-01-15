import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { NewsListComponent } from './components/news-list/news-list.component';

@NgModule({
  declarations: [NewsComponent, NewsListComponent],
  imports: [CommonModule],
})
export class NewsModule {}
