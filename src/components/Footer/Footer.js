import React from 'react';
import { string } from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import { twitterPageURL } from '../../util/urlHelpers';
import config from '../../config';
import {
  IconSocialMediaFacebook,
  IconSocialMediaInstagram,
  IconSocialMediaTwitter,
  Logo,
  ExternalLink,
  NamedLink,
} from '../../components';

import css from './Footer.css';

const renderSocialMediaLinks = intl => {
  const { siteFacebookPage, siteInstagramPage, siteTwitterHandle } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  const goToFb = intl.formatMessage({ id: 'Footer.goToFacebook' });
  const goToInsta = intl.formatMessage({ id: 'Footer.goToInstagram' });
  const goToTwitter = intl.formatMessage({ id: 'Footer.goToTwitter' });

  const fbLink = siteFacebookPage ? (
    <ExternalLink key="linkToFacebook" href={siteFacebookPage} className={css.icon} title={goToFb}>
      <IconSocialMediaFacebook />
    </ExternalLink>
  ) : null;

  const twitterLink = siteTwitterPage ? (
    <ExternalLink
      key="linkToTwitter"
      href={siteTwitterPage}
      className={css.icon}
      title={goToTwitter}
    >
      <IconSocialMediaTwitter />
    </ExternalLink>
  ) : null;

  const instragramLink = siteInstagramPage ? (
    <ExternalLink
      key="linkToInstagram"
      href={siteInstagramPage}
      className={css.icon}
      title={goToInsta}
    >
      <IconSocialMediaInstagram />
    </ExternalLink>
  ) : null;
  return [fbLink, twitterLink, instragramLink].filter(v => v != null);
};

const Footer = props => {
  const { rootClassName, className, intl } = props;
  const socialMediaLinks = renderSocialMediaLinks(intl);
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.topBorderWrapper}>
        <div className={css.content}>
          <div className={css.someLiksMobile}>{socialMediaLinks}</div>
          <div className={css.links}>
            <div className={css.organization} id="organization">
              <NamedLink name="LandingPage" className={css.logoLink}>
                <Logo format="desktop" className={css.logo} />
              </NamedLink>
              <div className={css.organizationInfo}>
                <p className={css.organizationDescription}>
                  <FormattedMessage id="Footer.organizationDescription" />
                </p>
                <p className={css.organizationCopyright}>
                  <NamedLink name="LandingPage" className={css.copyrightLink}>
                    <FormattedMessage id="Footer.copyright" />
                  </NamedLink>
                </p>
              </div>
            </div>
            <div className={css.infoLinks}>
              <ul className={css.list}>
              {/* <li className={css.listItem}>
                  <NamedLink name="NewListingPage" className={css.link}>
                    <FormattedMessage id="Footer.howItworksPage" />
                  </NamedLink>
                </li> */}
                <li className={css.listItem}>
                  <NamedLink name="NewListingPage" className={css.link}>
                    <FormattedMessage id="Footer.toNewListingPage" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink name="AboutPage" className={css.link}>
                    <FormattedMessage id="Footer.toAboutPage" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink name="FaqPage" className={css.link}>
                    <FormattedMessage id="Footer.toFAQPage" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink name="ContactPage" to={{ hash: '#contact' }} className={css.link}>
                    <FormattedMessage id="Footer.toHelpPage" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink name="ContactPage" to={{ hash: '#contact' }} className={css.link}>
                    <FormattedMessage id="Footer.toContactPage" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink name="SubscriptionPage"  className={css.link}>
                    <FormattedMessage id="Footer.toSubscriptionPage" />
                  </NamedLink>
                </li>
              </ul>
            </div>
            <div className={css.searches}>
              <ul className={css.list}>
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        '?address=San%20Francisco%2C%20California%2C%20United%20States%20of%20America&bounds=37.8324430069081%2C-122.354995082683%2C37.6044780500533%2C-122.517910874663',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.searchSanFrancisco" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        '?address=New%20York%20City%2C%20New%20York%2C%20United%20States%20of%20America&bounds=40.917576401307%2C-73.7008392055224%2C40.477399%2C-74.2590879797556',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.searchNewYork" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        '?address=London%2C%20Greater%20London%2C%20England%2C%20United%20Kingdom&bounds=51.669993%2C0.152641%2C51.384598%2C-0.35167',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.searchLondon" />
                  </NamedLink>
                </li>
                {/* <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        '?address=Oulu%2C%20Finland&bounds=65.5643426%2C26.770696000000044%2C64.8443082%2C24.114941999999928&origin=65.0120888%2C25.465077199999996',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.searchOulu" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        '?address=Rukatunturi%2C%20Kuusamo%2C%20Finland&bounds=66.1699707%2C29.167735499999935%2C66.1609529%2C29.13572069999998&origin=66.1654622%2C29.151728100000014',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.searchRuka" />
                  </NamedLink>
                </li> */}
              </ul>
            </div>
            <div className={css.searchesExtra}>
              <ul className={css.list}>
                {/* <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        '?address=Kuopio%2C%20Finland&bounds=63.40340329999999%2C28.457629300000008%2C62.592254%2C26.890028099999995&origin=62.89796999999999%2C27.67817249999996',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.searchKuopio" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        '?address=Mikkeli%2C%20Finland&bounds=62.1990357%2C27.900274999999965%2C61.20955799999999%2C26.82762809999997&origin=61.68872709999999%2C27.27214570000001',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.searchMikkeli" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        '?address=Espoo%2C%20Finland&bounds=60.3636105%2C24.8505715%2C60.0499087%2C24.499656500000015&origin=60.2054911%2C24.655899999999974',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.searchEspoo" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        '?address=Vantaa%2C%20Finland&bounds=60.40113659999999%2C25.19306240000003%2C60.23714200000001%2C24.746512199999984&origin=60.29335239999999%2C25.037768599999936',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.searchVantaa" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        '?address=Ahvenanmaan%20saaristo%2C%20Åland%20Islands&bounds=60.87664400000001%2C21.34532850000005%2C59.45425059999999%2C19.94061499999998&origin=59.8994405%2C20.593996100000027',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.searchAhvenanmaa" />
                  </NamedLink>
                </li> */}
              </ul>
            </div>
            <div className={css.extraLinks}>
              <div className={css.someLinks}>{socialMediaLinks}</div>
              <div className={css.legalMatters}>
                <ul className={css.tosAndPrivacy}>
                  <li>
                    <NamedLink name="TermsOfServicePage" className={css.legalLink}>
                      <FormattedMessage id="Footer.termsOfUse" />
                    </NamedLink>
                  </li>
                  <li>
                    <NamedLink name="PrivacyPolicyPage" className={css.legalLink}>
                      <FormattedMessage id="Footer.privacyPolicy" />
                    </NamedLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={css.copyrightAndTermsMobile}>
            <NamedLink name="LandingPage" className={css.organizationCopyrightMobile}>
              <FormattedMessage id="Footer.copyright" />
            </NamedLink>
            <div className={css.tosAndPrivacyMobile}>
              <NamedLink name="PrivacyPolicyPage" className={css.privacy}>
                <FormattedMessage id="Footer.privacy" />
              </NamedLink>
              <NamedLink name="TermsOfServicePage" className={css.terms}>
                <FormattedMessage id="Footer.terms" />
              </NamedLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Footer.defaultProps = {
  rootClassName: null,
  className: null,
};

Footer.propTypes = {
  rootClassName: string,
  className: string,
  // //intl: intlShape.isRequired,
};

export default injectIntl(Footer);
