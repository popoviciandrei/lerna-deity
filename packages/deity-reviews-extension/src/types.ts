import { Pagination, PaginationInput } from '@deity/falcon-data';

export type ReviewList = {
  items: Review[];
  pagination?: Pagination;
};

export type ReviewListInput = {
  postId?: number;
  name?: string;
  email?: string;
  pagination?: PaginationInput;
};

export type Review = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};
