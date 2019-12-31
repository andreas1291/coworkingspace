import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import { injectIntl, intlShape, FormattedMessage } from '../../util/reactIntl';
import {
  Subscription,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  // ExternalLink,
} from '../../components';

import css from './SubscriptionPage.css';

const SubscriptionPage = (props) => {
  // const { siteTwitterHandle, siteFacebookPage } = config;
  // const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  // prettier-ignore
  const { intl } = props;
  return (
    <StaticPage
      title="Contact | Book a coworkingspace everywhere"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'Subscription',
        description: 'Contact Us',
        name: 'Contact Page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>{ intl.formatMessage({ id: "SubscriptionPage.pageTitle" }) } </h1>
          <p className={css.text}> { intl.formatMessage({ id: "SubscriptionPage.pageSubTitle" }) }</p>
          <div className={css.contentWrapper}>
            <Subscription />
          </div>

        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default injectIntl(SubscriptionPage);

