import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { NamedLink } from '../../components';

import css from './SectionStudios.css';

import listing1 from './images/slide2.jpg';
import listing2 from './images/slide4.jpg';
import listing3 from './images/slide1.jpg';


const locationLinksData = [
    {
      name: "New York",
      image: listing1,
      title: "Light House",
      params: {
        slug: "light-house",
        id: "5dcfbac7-d284-4585-9b70-a695d3555637"
      },
      studioResume: {
        rating: 5,
        booking: 2,
        markPoint: 10,
      }
    },
    {
      name: "London",
      image: listing2,
      title: "Sweden House",
      params: {
        slug: "sweden-office",
        id: "5dc13608-3f9e-439f-a312-6822b08cdeb2"
      },
      studioResume: {
        rating: 5,
        booking: 1,
        markPoint: 10,
      }
    },
    {
      name: "San Francisco",
      image: listing3,
      title: "Counter House",
      params: {
        slug: "counter-house",
        id: "5db56729-a788-46ba-8a60-17fce4fcca0a"
      },
      studioResume: {
        rating: 4,
        booking: 5,
        markPoint: 9,
      }
    }
  ]

class LocationImage extends Component {
  render() {
    const { alt, ...rest } = this.props;
    return <img alt={alt} {...rest} />;
  }
}
const LazyImage = lazyLoadWithDimensions(LocationImage);

const Mark = props => {
  const { type } = props;

  return type=="premium"?(
    <span className={css.premium}>
      PREMIUM
    </span>
  ):(
    <span className={css.verified}>
      VERIFIED
    </span>
  )
}

const Price = props => {
  return (
    <div className={css.price}>
      <span className={css.priceAmount}>$30.00</span>
      <span className={css.priceUnit}>per day</span>
    </div>
  )
}

const StudioResume = props => {
  const { title, ...rest } = props
  return (
    <div style={{textAlign: "left"}}>
        <span className={css.studioMark}>
          {title}
        </span>
       <ReviewRating {...rest} />
    </div>
  )
}
const ReviewRating = props => {
  const { rating, markPoint, booking} = props
  return (
    <div style={{lineHeight: "10px"}}>
      <span>
        {
          [1,1,1,1,1].map((item, index) => {
            return (
              <svg key={index} viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg" width="10" height="10"><path d="M22.938 8.008c-.15-.412-.544-.69-.985-.69H14.38L12.507.758C12.377.31 11.967 0 11.5 0c-.467 0-.88.31-1.006.76L8.618 7.317H1.046c-.442 0-.833.278-.983.69-.15.414-.025.876.314 1.16l5.7 4.75L3.2 21.59c-.16.43-.02.916.346 1.196.362.28.87.29 1.242.02l6.71-4.79 6.713 4.79c.375.27.88.26 1.245-.02.366-.28.504-.765.343-1.196l-2.875-7.67 5.7-4.75c.34-.284.463-.746.315-1.16" fillRule="evenodd"></path></svg>
            )
          })
        }
      </span>
      <span className={css.markPoint}>
      {markPoint}
      </span>
      <span className={css.seperator}>
        .
      </span>
      <span className={css.bookingNumber}>
        {booking} bookings
      </span>
    </div>
  )
}

const ListingItem = props => {
  const { name, image, title, params, studioResume } = props

  return (
  <NamedLink name="ListingPage" params={params} className={css.location}>
      <div className={css.imageWrapper}>
        <div className={css.aspectWrapper} id="wrapperAspect">
          <LazyImage src={image} alt={name} className={css.locationImage} />
          <span className={css.reply}>Quick replies</span>
        </div>
        <div className={css.linkText} id="textLink">
          <div className={css.listingDetailInfo}>
            <Mark type="premium" />
            <Mark type="verified" />
          </div>
          <div className={css.listingDetailInfo}>
            <Price />
            <StudioResume title={title} {...studioResume}/>
          </div>
        </div>
    </div>
  </NamedLink>
  );
};

const SectionStudios = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionStudios.title" />
      </div>
      {/* <div className={css.subTitle}>
        <FormattedMessage id="SectionStudios.title" />
      </div> */}
      <div className={css.locations}>
        {
          locationLinksData.map((item, index) => {
            return (
              <ListingItem
                key={index}
                name={item.name}
                image={item.image}
                title={item.title}
                params={item.params}
                studioResume={item.studioResume}
              />
            )
          })
        }
    </div>
    </div>
  );
};

SectionStudios.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionStudios.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionStudios;
