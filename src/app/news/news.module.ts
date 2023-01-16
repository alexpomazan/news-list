import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NewsService } from './services/news.service';
import { NewsRoutingModule } from './news-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SharedModule } from '../shared/shared.module';
import { AddNewsComponent } from './components/add-news/add-news.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  declarations: [NewsComponent, NewsListComponent, NewsDetailComponent, AddNewsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NewsRoutingModule,
    HttpClientModule,
    NzCardModule,
    NzSpinModule,
    NzIconModule,
    NzButtonModule,
    NzModalModule,
    SharedModule,
    NzToolTipModule,
    NzUploadModule,
    NzFormModule,
    NzInputModule,
  ],
  providers: [NewsService],
})
export class NewsModule {}
