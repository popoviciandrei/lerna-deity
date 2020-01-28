import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Toggle } from 'react-powerplug';
import { ReviewCard, ReviewHeader, ReviewBody, Link } from './components';

export type ProductReviewType = {
  postId: number;
  id: number;
  name: String;
  email: String;
  body: String;
}

export const ProductReview: React.SFC<ProductReviewType> = ({ postId, id, name, email, body }) => (
  <Toggle initial={false}>
    {({ on, toggle }) => (
      <ReviewCard>
        <ReviewHeader>
          Email: {email}
          <Link onClick={toggle}>{!on && ' [ Show review + ]'}{on && ' [ Hide review - ]'}</Link></ReviewHeader>
        {on && (<ReviewBody><b>'{name}'</b> says: <br />{body}</ReviewBody>)}
      </ReviewCard>
    )}
  </Toggle>
);


ProductReview.propTypes = {
  postId: PropTypes.number,
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  body: PropTypes.string
}