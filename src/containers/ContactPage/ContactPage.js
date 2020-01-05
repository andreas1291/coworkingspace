import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  ContactForm,
  GoogleMap,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  // ExternalLink,
} from '../../components';

import css from './ContactPage.css';

const ContactPage = () => {
  // const { siteTwitterHandle, siteFacebookPage } = config;
  // const siteTwitterPage = twitterPageURL(siteTwitterHandle);
  const initialCenter = {lat:45.475420, lng:9.184960}
  // prettier-ignore
  
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>Need help? Ask our experts for any help you need.</h1>

          <div className={css.contentWrapper}>

          <ContactForm />

          <GoogleMap initialCenter={initialCenter}/>

          </div>

        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default ContactPage;

