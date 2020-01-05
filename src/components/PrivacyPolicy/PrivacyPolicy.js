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
    <div className={classes}>
      <p className={css.lastUpdated}>
        {intl.formatMessage({ id: `PrivacyPolicyPage.postDate` })}
      </p>

      <p>
      {intl.formatMessage({ id: `PrivacyPolicyPage.description` })}
      </p>

      {
        indexAry.map((subItem, index) => (
          <React.Fragment>
            <h2 style={{ fontStyle: "bolder" }}>
              <FormattedMessage id={`TermsOfService.panel${index+1}.heading`} />
            </h2>
            {
              subItem.map((ul, subIndex) => (
                  <React.Fragment>
                    <h2> { intl.formatMessage({ id: `TermsOfService.panel${index+1}.option${subIndex+1}.heading` }) } </h2>
                    <p>
                    { intl.formatMessage({ id: `TermsOfService.panel${index+1}.option${subIndex+1}.description` }) }
                    </p>
                  </React.Fragment>
                )
              )
            }
          </React.Fragment>
        ))
      }
      {/* <h2 style={{ fontStyle: "bolder" }}>Coworkingspaces must:</h2>

      <h2>1. Comply with local laws, tax laws and other local rules and acts.</h2>
      <p>
        Every coworkingspace and community user is self-responsible to follow the tax-rules and laws,
        and other local laws in his homecountry or his company residence. Coworkertime rejects any liabilities
        in case of law or tax violations . You must also legally report income generated from Coworkertime
        to your business and it is your responsibility to do so. If you are responsible for charging local taxes on services,
        you must also comply with these regulations.
      </p>

      <h2>2. Accurate representation of coworkingspaces, pricing and services</h2>
      <p>
        Most coworkers have not seen the coworkingspaces before booking in person.
        Be honest and clearly represent your service and your coworkingspace that your offering.
        We will take proactive action if it is reported or discovered that you are misrepresenting
        your coworkingspace or the services that you offer.
      </p>

      <h2>3. Only list and offer a coworkingspace that you are permissed to offer</h2>
      <p>
        Only list a coworkingspace that you are permissed to offer. And have the authority for it.
        If you offer a studio for which you have no permission to offer it on Coworkertime,
        the listing will be removed from the platform  and also your account.
      </p> */}



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
