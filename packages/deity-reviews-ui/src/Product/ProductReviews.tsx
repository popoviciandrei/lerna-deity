import React from 'react';
import PropTypes from 'prop-types';
import { Toggle } from 'react-powerplug';
import { ReviewListQuery } from '@npmapopovici/deity-reviews-data';
import { ProductReview } from './ProductReview';
import { ReviewsContainer, Link } from './components';
export type ProductReviewsType = {
  productId: number;
};





export const ProductReviews: React.SFC<ProductReviewsType> = ({ productId }) => (<React.Fragment>
  <ReviewListQuery variables={{ input: { postId: productId } }}>
    {({
      data: {
        reviewList: { items, pagination }
      }
    }) =>
      items.length && (
        <Toggle initial={false}>
          {({ on, toggle }) =>
            <ReviewsContainer>
              <h3>
                Product reviews
              <Link onClick={toggle}> [ {!on && 'show'}{on && 'hide'} ]</Link>
              </h3>
              {on && items.map(item => (<ProductReview {...item} />))}
            </ReviewsContainer>
          }
        </Toggle>
      )}

  </ReviewListQuery>
</React.Fragment>);

ProductReviews.propTypes = {
  productId: PropTypes.number
};