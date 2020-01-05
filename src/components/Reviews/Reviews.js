import React from 'react';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { arrayOf, string } from 'prop-types';
import classNames from 'classnames';
import { Avatar, ReviewRating, UserDisplayName } from '../../components';
import { propTypes } from '../../util/types';

import css from './Reviews.css';

const Review = props => {
  const { review, intl } = props;

  const date = review.attributes.createdAt;
  const dateString = intl.formatDate(date, { month: 'long', year: 'numeric' });

  return (
const ReviewsComponent = props => {
  const { className, rootClassName, reviews, intl } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <ul className={classes}>
      {reviews.map(r => {
        return (
          <li key={`Review_${r.id.uuid}`} className={css.reviewItem}>
            <Review review={r} intl={intl} />
          </li>
        );
      })}
    </ul>
  );
};

ReviewsComponent.defaultProps = {
  className: null,
  rootClassName: null,
  reviews: [],
};

ReviewsComponent.propTypes = {
  className: string,
  rootCalssName: string,
  reviews: arrayOf(propTypes.review),

  // from injectIntl
  //intl: intlShape.isRequired,
};

const Reviews = injectIntl(ReviewsComponent);

export default Reviews;
