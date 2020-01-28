import gql from 'graphql-tag';
import { Query, OperationInput } from '@deity/falcon-data';
import {
  Review,
  ReviewList,
  ReviewListInput
} from '@npmapopovici/deity-reviews-extension';

const GET_REVIEW_LIST = gql`
  query Reviews($input: ReviewListInput) {
    reviewList(input: $input) {
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
  reviewList: Pick<ReviewList, 'pagination'> & {
    items: Pick<Review, 'postId' | 'id' | 'name' | 'email' | 'body'>[];
  };
};

export class ReviewListQuery extends Query<
  ReviewListResponse,
  OperationInput<ReviewListInput>
> {
  static defaultProps = {
    query: GET_REVIEW_LIST,
    fetchPolicy: 'cache-and-network'
  };
}
