export interface Category {
  id: string;
  name: string;
  path: string;
  children: Category[];
  articles?: Article[];
}
export interface Article {
  id: string;
  title: string;
  content: string;
}
