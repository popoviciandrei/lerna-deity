import { Pagination } from "@deity/falcon-data";

export type ReviewList = {
  items: Review[];
};

export type Review = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};
