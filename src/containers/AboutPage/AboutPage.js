import React from 'react';
import config from '../../config';
import { twitterPageURL } from '../../util/urlHelpers';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  ExternalLink,
} from '../../components';

import css from './AboutPage.css';
import image from './about-us-1056.jpg';

const AboutPage = () => {
  const { siteTwitterHandle, siteFacebookPage } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  // prettier-ignore
  return (
    <StaticPage
      title="About Us"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'AboutPage',
        description: 'About Coworkingtime',
        name: 'About page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>We connect coworker with a coworkingspace.</h1>
          <h1 className={css.pageSubTitle}>Let's write the future of working together.</h1>
          <div className={css.testmentional}>
            <div className={css.comment}>
              <p>Did you know that Coworkertime is the first open marketplace for coworkingspaces?</p>
            </div>
            <div className={css.imagewrapper}>
              <img className={css.coverImage} src={image} alt="My first ice cream." />
            </div>
          </div>
          <div className={css.contentWrapper}>
            <div className={css.contentMain}>
              <h2>
                About Coworkertime.
              </h2>
              <p>
                Coworkertime is a community to connect beautiful coworkingspaces with wonderful peoples who want be a part of the future of working.We are the first open community without any liabilities for specific profiders. Our mission is to connect coworkers with office space around the world. Self-contained of brand, Provider, country or others. We offer a fair price-model for all and we are edicated to afford a contribution of the working in tomorrow.We are a small company located in Switzerland. Our target is to grow without help from outside. We are obsessed to build the largest and most trusted online marketplace for coworkingspaces.
              </p>
            </div>
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default AboutPage;
