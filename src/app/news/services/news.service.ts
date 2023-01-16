import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { News, NewsDetail, NewsResponse } from '../models/news.model';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  protected apiUrl = 'https://webapi.autodoc.ru/api/';
  public newNewsEvent$ = new EventEmitter<News>();

  loadNewsListByPage(pageIndex: number, pageSize: number): Observable<NewsResponse> {
    return this.http.get<NewsResponse>(`${this.apiUrl}news/${pageIndex}/${pageSize}`);
  }

  getNewsDetail(category: string, url: string): Observable<NewsDetail> {
    return this.http.get<NewsDetail>(`${this.apiUrl}news/item/${category}/${url}`);
  }

  getNewsFromStorage(): News[] | null {
    const userNews = localStorage.getItem('UserNews');
    if (userNews) {
      return JSON.parse(userNews) as News[];
    }
    return null;
  }

  saveNewNews(news: News): void {
    this.setNewsToStorage(news);
    this.newNewsEvent$.next(news);
  }

  setNewsToStorage(news: News): void {
    const localNews = [];
    const localStorageNews = this.getNewsFromStorage();
    if (localStorageNews) {
      localNews.push(...localStorageNews, news);
      localStorage.setItem('UserNews', JSON.stringify(localNews));
      return;
    }
    localNews.push(news);
    localStorage.setItem('UserNews', JSON.stringify(localNews));
  }

  getBase64(file: File): Observable<string> {
    return from(
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result?.toString() || '');
        reader.onerror = (error) => reject(error);
      }),
    );
  }
}
