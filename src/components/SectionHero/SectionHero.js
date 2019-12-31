import React from 'react';
import { string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { NamedLink } from '../../components';

import css from './SectionHero.css';

const SectionHero = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <React.Fragment>
      <h1 className={css.sectionHeroTitle}>
        <FormattedMessage id="SectionHero.title" />
      </h1>
      <div className={classes}>
        <div className={css.heroContent}>
          <h1 className={css.heroMainTitle}>
            <FormattedMessage id="SectionHero.subTitle" />
          </h1>
          {/* <h2 className={css.heroSubTitle}>
            <FormattedMessage id="SectionHero.subTitle" />
          </h2> */}
          <NamedLink
            name="SearchPage"
            // to={{
            //   search:
            //     'address=Finland&bounds=70.0922932%2C31.5870999%2C59.693623%2C20.456500199999937',
            // }}
            className={css.heroButton}
          >
            <FormattedMessage id="SectionHero.browseButton" />
          </NamedLink>
        </div>
      </div>
    </React.Fragment>
  );
};

SectionHero.defaultProps = { rootClassName: null, className: null };

SectionHero.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionHero;
