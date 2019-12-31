import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { NamedLink } from '../../components';

import css from './SectionLocations.css';

import listing1 from './images/slide1.jpg';
import listing2 from './images/slide2.jpg';
import listing3 from './images/slide4.jpg';
import listing4 from './images/slide4.jpg';
import listing5 from './images/slide2.jpg';
import listing6 from './images/slide1.jpg';

const locationLinksData = {
  explore: [
    {
      name: "San Francisco",
      image: listing1,
      address: "?address=San%20Francisco%2C%20California%2C%20United%20States%20of%20America&bounds=37.8324430069081%2C-122.354995082683%2C37.6044780500533%2C-122.517910874663"
    },
    {
      name: "New York",
      image: listing2,
      address: "?address=New%20York%20City%2C%20New%20York%2C%20United%20States%20of%20America&bounds=40.917576401307%2C-73.7008392055224%2C40.477399%2C-74.2590879797556"
    },
    {
      name: "London",
      image: listing3,
      address: "?address=London%2C%20Greater%20London%2C%20England%2C%20United%20Kingdom&bounds=51.669993%2C0.152641%2C51.384598%2C-0.35167"
    }
  ],

  type: [
    {
      name: "Meeting Room",
      image: listing4,
      address: "?pub_category=meetingroom"
    },
    {
      name: "Single Desk",
      image: listing5,
      address: "?pub_category=singledesk"
    },
    {
      name: "Flex Desk",
      image: listing6,
      address: "?pub_category=flexdesk"
    }
  ]
}

class LocationImage extends Component {
  render() {
    const { alt, ...rest } = this.props;
    return <img alt={alt} {...rest} />;
  }
}
const LazyImage = lazyLoadWithDimensions(LocationImage);

const ListingItem = props => {
  const { name, image, address } = props
  return (
  <NamedLink name="SearchPage" to={{ search: address }} className={css.location}>
      <div className={css.imageWrapper}>
        <div className={css.aspectWrapper} id="wrapperAspect">
          <LazyImage src={image} alt={name} className={css.locationImage} />
          <div className={css.locationName}>
            <span className={css.locationName}>{name}</span>
          </div>
        </div>
    </div>
  </NamedLink>
  );
};

const SectionLocations = props => {
  const { rootClassName, className, flag } = props;

  const classes = classNames(rootClassName || css.root, className);
  const dataIndex = flag;
  const titleId = flag == "explore"? "SectionLocations.title1" : "SectionLocations.title2";
  const subTitleId = flag == "explore"? "SectionLocations.subTitle1" : "SectionLocations.subTitle2";
  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id={titleId} />
      </div>
      <div className={css.subTitle}>
        <FormattedMessage id={subTitleId} />
      </div>
      <div className={css.locations}>
        {
          locationLinksData[dataIndex].map((item, index) => {
            return (
              <ListingItem
                key={index}
                name={item.name}
                image={item.image}
                address={item.address}
              />
            )
          })
        }
      </div>
    </div>
  );
};

SectionLocations.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionLocations.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionLocations;
