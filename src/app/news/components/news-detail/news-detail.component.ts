import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { Subject, takeUntil } from 'rxjs';
import { NewsDetail } from '../../models/news.model';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss'],
})
export class NewsDetailComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  isLoading = false;
  newsDetail: NewsDetail | null;
  constructor(private route: ActivatedRoute, private newsService: NewsService) {}

  ngOnInit() {
    this.route.url.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.getDetailData(params[0].path, params[1].path);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getDetailData(category: string, url: string) {
    this.isLoading = true;
    this.newsService
      .getNewsDetail(category, url)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.newsDetail = response;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }
}
