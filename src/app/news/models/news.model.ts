export interface NewsResponse {
  news: News[];
  totalCount: number;
}

export interface News {
  id: number;
  title: string;
  description: string;
  publishedDate: string | Date;
  url: string;
  fullUrl: string;
  titleImageUrl: string;
  categoryType: string;
  isUserNews?: boolean;
}

export interface NewsDetail {
  id: number;
  title: string;
  description: string;
  text: string;
}

export interface NewNews {
  title: string;
  description: string;
  titleImageUrl: string;
}
