import gql from "graphql-tag";
import { Query } from "@deity/falcon-data";
import { Review } from "@npmapopovici/deity-reviews-extension";

const GET_REVIEW = gql`
  query Review($id: int!) {
    review(id: $id) {
      postId
      id
      name
      email
      body
    }
  }
`;

export type ReviewResponse = {
  review: Pick<Review, "postId" | "id" | "name" | "email" | "body">;
};

export type ReviewQueryVariables = {
  id: number;
};

export class ReviewQuery extends Query<ReviewResponse, ReviewQueryVariables> {
  static defaultProps = {
    query: GET_REVIEW
  };
}
