import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NewNews, News } from '../../models/news.model';
import { NewsService } from '../../services/news.service';
import { Observable, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss'],
})
export class AddNewsComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  selectedFile: string | undefined;
  private destroy$ = new Subject<void>();
  constructor(private newsService: NewsService, private modalRef: NzModalRef) {}

  ngOnInit() {
    this.createFormGroup();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.convertFile(file as unknown as File)
      .pipe(takeUntil(this.destroy$))
      .subscribe((imageUrl) => {
        this.formGroup.patchValue({ titleImageUrl: imageUrl });
        this.selectedFile = file.name;
      });
    return false;
  };

  createFormGroup() {
    this.formGroup = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      titleImageUrl: new FormControl(null, Validators.required),
    });
  }

  submitForm(): void {
    if (this.formGroup.valid) {
      this.saveNewNews(this.formGroup.value);
      this.modalRef.close();
    } else {
      Object.values(this.formGroup.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  saveNewNews(newNews: NewNews): void {
    const news: News = {
      id: Math.floor(Math.random() * 10000),
      title: newNews.title,
      description: newNews.description,
      publishedDate: new Date(),
      url: '',
      fullUrl: '',
      titleImageUrl: newNews.titleImageUrl,
      categoryType: '',
      isUserNews: true,
    };

    this.newsService.saveNewNews(news);
  }

  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => result.next(reader.result?.toString() || '');
    return result;
  }
}
