import gql from "graphql-tag";
import { PaginationQuery, PaginationInput, Query } from "@deity/falcon-data";
import {
  Review,
  ReviewList,
  ReviewListQuery,
  ReviewListQueryInput
} from "@npmapopovici/deity-reviews-extension";

const GET_REVIEW_LIST = gql`
  query Reviews($query: ReviewListQueryInput, $pagination: PaginationInput) {
    reviewList(quer: $query, pagination: $pagination) {
      items {
        postId
        id
        email
        name
        body
      }
      pagination {
        perPage
        totalItems
        totalPages
        currentPage
      }
    }
  }
`;

export type ReviewListResponse = {
  reviewList: Pick<ReviewList, "pagination"> & {
    items: Pick<Review, "postId" | "id" | "name" | "email" | "body">[];
  };
};

export type ReviewListQueryVariables = ReviewListQuery & PaginationQuery;

export class ReviewQListuery extends Query<
  ReviewListResponse,
  ReviewListQueryVariables
> {
  static defaultProps = {
    query: GET_REVIEW_LIST
  };
}
