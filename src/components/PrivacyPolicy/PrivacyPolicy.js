import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { injectIntl, intlShape, FormattedMessage } from '../../util/reactIntl';
import css from './PrivacyPolicy.css';

const PrivacyPolicy = props => {
  const { rootClassName, className, intl } = props;
  const classes = classNames(rootClassName || css.root, className);

  const indexAry = [
    [1,2,3],
    [1,2],
    [1,2],
    [1,2,3],
  ];
  // prettier-ignore
  return (
    act.Fragment>
                    <h2> { intl.formatMessage({ id: `PrivacyPolicyPage.panel${index+1}.option${subIndex+1}.heading` }) } </h2>
                    <p>
                    { intl.formatMessage({ id: `PrivacyPolicyPage.panel${index+1}.option${subIndex+1}.description` }) }
                    </p>
                  </React.Fragment>
                )
              )
            }
          </React.Fragment>
        ))
      }


    </div>
  );
};

PrivacyPolicy.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

PrivacyPolicy.propTypes = {
  rootClassName: string,
  className: string,
};

export default injectIntl(PrivacyPolicy);
