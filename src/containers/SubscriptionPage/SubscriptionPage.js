import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
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

const SubscriptionPage = () => {
  // const { siteTwitterHandle, siteFacebookPage } = config;
  // const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  // prettier-ignore
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
          <h1 className={css.pageTitle}>Increase your marketing activities with our marketing-plans and become more successful. </h1>
          <p className={css.text}> We help you to generate more traffic and bookings for your coworkingspaces. </p>
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

export default SubscriptionPage;

