import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Subject, takeUntil } from 'rxjs';
import { News } from '../../models/news.model';
import { debounce } from '../../../shared/decorators/debounce';
import { AddNewsComponent } from '../add-news/add-news.component';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
})
export class NewsListComponent implements OnInit, OnDestroy {
  @ViewChild('newsListElement', { static: false }) newsListRef: ElementRef<HTMLDivElement>;

  public newsList: News[] = [];
  public totalCount = 0;
  public pageIndex = 1;
  public pageSize = 10;
  public isLoading: boolean;
  public isScrollLoading: boolean;
  public isFirstLoud = true;
  private destroy$ = new Subject<void>();

  constructor(private newsService: NewsService, private modalService: NzModalService) {}

  @HostListener('window:scroll', [])
  @debounce()
  onWindowScroll() {
    const { nativeElement } = this.newsListRef;
    if (
      nativeElement.clientHeight < scrollY + screen.availHeight &&
      this.newsList.length !== this.totalCount
    ) {
      this.isScrollLoading = true;
      this.getNews(this.pageIndex, this.pageSize);
      this.pageIndex += 1;
    }
  }

  ngOnInit(): void {
    this.getNews(this.pageIndex, this.pageSize);
    this.pageIndex += 1;

    this.newsService.newNewsEvent$.pipe(takeUntil(this.destroy$)).subscribe((news) => {
      this.newsList.unshift(news);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getNews(pageIndex: number, pageSize: number) {
    this.isLoading = true;
    this.newsService
      .loadNewsListByPage(pageIndex, pageSize)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.newsList = [...this.newsList, ...response.news];
          const userNews = this.getUserNews();
          if (userNews?.length && this.isFirstLoud) {
            this.newsList = [...userNews, ...this.newsList];
          }
          this.totalCount = response.totalCount;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.isLoading = false;
          this.isScrollLoading = false;
          this.isFirstLoud = false;
        },
      });
  }

  createModalAddNews() {
    this.modalService.create({
      nzTitle: 'Добавление новости',
      nzContent: AddNewsComponent,
      nzWidth: '800px',
      nzFooter: null,
    });
  }

  getUserNews(): News[] | null {
    return this.newsService.getNewsFromStorage();
  }
}
