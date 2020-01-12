import React from 'react';
import { createBrowserHistory } from "history";
import {
  AboutPage,
  AuthenticationPage,
  CheckoutPage,
  ContactDetailsPage,
  ContactPage,
  EditListingPage,
  EmailVerificationPage,
  FaqPage,
  InboxPage,
  LandingPage,
  ListingPage,
  ManageListingsPage,
  NotFoundPage,
  PasswordChangePage,
  PasswordRecoveryPage,
  PasswordResetPage,
  PayoutPreferencesPage,
  PaymentMethodsPage,
  PrivacyPolicyPage,
  ProfilePage,
  ProfileSettingsPage,
  SearchPage,
  StyleguidePage,
  TermsOfServicePage,
  TransactionPage,
  SubscriptionPage,
} from './containers';

// routeConfiguration needs to initialize containers first
// Otherwise, components will import form container eventually and
// at that point css bundling / imports will happen in wrong order.
import { NamedRedirect } from './components';
import { getLocaleFromUrl } from './util/data';
import config from './config';

export const ACCOUNT_SETTINGS_PAGES = [
  'ContactDetailsPage',
  'PasswordChangePage',
  'PayoutPreferencesPage',
  'PaymentMethodsPage',
];

// https://en.wikipedia.org/wiki/Universally_unique_identifier#Nil_UUID
const draftId = '00000000-0000-0000-0000-000000000000';
const draftSlug = 'draft';

const RedirectToLandingPage = () => <NamedRedirect name="LandingPage" />;

// Our routes are exact by default.
// See behaviour from Routes.js where Route is created.
const routeConfiguration = (pathname = "") => {
  const routes = [
    {
      path: '/',
      name: 'LandingPage',
      component: props => <LandingPage {...props} />,
    },
    {
      path: '/about',
      name: 'AboutPage',
      component: AboutPage,
    },
    {
      path: '/s',
      name: 'SearchPage',
      component: props => <SearchPage {...props} />,
      loadData: SearchPage.loadData,
    },
    {
      path: '/s/filters',
      name: 'SearchFiltersPage',
      component: props => <SearchPage {...props} tab="filters" />,
      loadData: SearchPage.loadData,
    },
    {
      path: '/s/listings',
      name: 'SearchListingsPage',
      component: props => <SearchPage {...props} tab="listings" />,
      loadData: SearchPage.loadData,
    },
    {
      path: '/s/map',
      name: 'SearchMapPage',
      component: props => <SearchPage {...props} tab="map" />,
      loadData: SearchPage.loadData,
    },
    {
      path: '/l',
      name: 'ListingBasePage',
      component: RedirectToLandingPage,
    },
    {
      path: '/l/:slug/:id',
      name: 'ListingPage',
      component: props => <ListingPage {...props} />,
      loadData: ListingPage.loadData,
    },
    {
      path: '/l/:slug/:id/checkout',
      name: 'CheckoutPage',
      auth: true,
      component: props => <CheckoutPage {...props} />,
      setInitialValues: CheckoutPage.setInitialValues,
    },
    {
      path: '/l/:slug/:id/:variant',
      name: 'ListingPageVariant',
      auth: true,
      authPage: 'LoginPage',
      component: props => <ListingPage {...props} />,
      loadData: ListingPage.loadData,
    },
    {
      path: '/l/new',
      name: 'NewListingPage',
      auth: true,
      component: () => (
        <NamedRedirect
          name="EditListingPage"
          params={{ slug: draftSlug, id: draftId, type: 'new', tab: 'description' }}
        />
      ),
    },
    {
      path: '/l/:slug/:id/:type/:tab',
      name: 'EditListingPage',
      auth: true,
      component: props => <EditListingPage {...props} />,
      loadData: EditListingPage.loadData,
    },

    // Canonical path should be after the `/l/new` path since they
    // conflict and `new` is not a valid listing UUID.
    {
      path: '/l/:id',
      name: 'ListingPageCanonical',
      component: props => <ListingPage {...props} />,
      loadData: ListingPage.loadData,
    },
    {
      path: '/u',
      name: 'ProfileBasePage',
      component: RedirectToLandingPage,
    },
    {
      path: '/u/:id',
      name: 'ProfilePage',
      component: props => <ProfilePage {...props} />,
      loadData: ProfilePage.loadData,
    },
    {
      path: '/profile-settings',
      name: 'ProfileSettingsPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <ProfileSettingsPage {...props} />,
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: props => <AuthenticationPage {...props} tab="login" />,
    },
    {
      path: '/signup',
      name: 'SignupPage',
      component: props => <AuthenticationPage {...props} tab="signup" />,
    },
    {
      path: '/recover-password',
      name: 'PasswordRecoveryPage',
      component: props => <PasswordRecoveryPage {...props} />,
    },
    {
      path: '/inbox',
      name: 'InboxBasePage',
      auth: true,
      authPage: 'LoginPage',
      component: () => <NamedRedirect name="InboxPage" params={{ tab: 'sales' }} />,
    },
    {
      path: '/inbox/:tab',
      name: 'InboxPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <InboxPage {...props} />,
      loadData: InboxPage.loadData,
    },
    {
      path: '/order/:id',
      name: 'OrderPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <NamedRedirect name="OrderDetailsPage" params={{ ...props.params }} />,
    },
    {
      path: '/order/:id/details',
      name: 'OrderDetailsPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <TransactionPage {...props} transactionRole="customer" />,
      loadData: params => TransactionPage.loadData({ ...params, transactionRole: 'customer' }),
      setInitialValues: TransactionPage.setInitialValues,
    },
    {
      path: '/sale/:id',
      name: 'SalePage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <NamedRedirect name="SaleDetailsPage" params={{ ...props.params }} />,
    },
    {
      path: '/sale/:id/details',
      name: 'SaleDetailsPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <TransactionPage {...props} transactionRole="provider" />,
      loadData: params => TransactionPage.loadData({ ...params, transactionRole: 'provider' }),
    },
    {
      path: '/listings',
      name: 'ManageListingsPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <ManageListingsPage {...props} />,
      loadData: ManageListingsPage.loadData,
    },
    {
      path: '/subscription',
      name: 'SubscriptionPage',
      component: props => <SubscriptionPage {...props} />,
    },
    {
      path: '/account',
      name: 'AccountSettingsPage',
      auth: true,
      authPage: 'LoginPage',
      component: () => <NamedRedirect name="ContactDetailsPage" />,
    },
    {
      path: '/account/contact-details',
      name: 'ContactDetailsPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <ContactDetailsPage {...props} />,
      loadData: ContactDetailsPage.loadData,
    },
    {
      path: '/account/change-password',
      name: 'PasswordChangePage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <PasswordChangePage {...props} />,
    },
    {
      path: '/account/payments',
      name: 'PayoutPreferencesPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <PayoutPreferencesPage {...props} />,
      loadData: PayoutPreferencesPage.loadData,
    },
    {
      path: '/account/payment-methods',
      name: 'PaymentMethodsPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <PaymentMethodsPage {...props} />,
      loadData: PaymentMethodsPage.loadData,
    },
    {
      path: '/contact',
      name: 'ContactPage',
      component: ContactPage,
    },
    {
      path: '/terms-of-service',
      name: 'TermsOfServicePage',
      component: props => <TermsOfServicePage {...props} />,
    },
    {
      path: '/privacy-policy',
      name: 'PrivacyPolicyPage',
      component: props => <PrivacyPolicyPage {...props} />,
    },
    {
      path: '/styleguide',
      name: 'Styleguide',
      component: props => <StyleguidePage {...props} />,
    },
    {
      path: '/styleguide/g/:group',
      name: 'StyleguideGroup',
      component: props => <StyleguidePage {...props} />,
    },
    {
      path: '/styleguide/c/:component',
      name: 'StyleguideComponent',
      component: props => <StyleguidePage {...props} />,
    },
    {
      path: '/styleguide/c/:component/:example',
      name: 'StyleguideComponentExample',
      component: props => <StyleguidePage {...props} />,
    },
    {
      path: '/styleguide/c/:component/:example/raw',
      name: 'StyleguideComponentExampleRaw',
      component: props => <StyleguidePage raw {...props} />,
    },
    {
      path: '/notfound',
      name: 'NotFoundPage',
      component: props => <NotFoundPage {...props} />,
    },
    {
      path: '/faq',
      name: 'FaqPage',
      component: props => <FaqPage {...props} />,
    },

    // Do not change this path!
    //
    // The API expects that the application implements /reset-password endpoint
    {
      path: '/reset-password',
      name: 'PasswordResetPage',
      component: props => <PasswordResetPage {...props} />,
    },

    // Do not change this path!
    //
    // The API expects that the application implements /verify-email endpoint
    {
      path: '/verify-email',
      name: 'EmailVerificationPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <EmailVerificationPage {...props} />,
      loadData: EmailVerificationPage.loadData,
    },
  ];

  //  GET LOCALE INFO FROOM URL
  // we can get locale info from url.
  //
  // e.g. http://localhost:3001/fr/
  // then we can decide user want to change language
  // from original language to frace...
  //

  if (!pathname && typeof window !== 'undefined') {
    // it's safe to use window now
    pathname = window.location.pathname
  }
  // const customHistory = createBrowserHistory();
  console.log('pathname', pathname)
  const { languageCountryConfig } = config.custom
  const tempLocale = getLocaleFromUrl( pathname, languageCountryConfig )

  const locale = tempLocale === undefined?
    config.locale : tempLocale

  const updatedRoutes = routes.map(item => {
    return {
      ...item,
      path: `/${locale}${item.path}`
    }
  })

  // console.log('routeconfig', locale, updatedRoutes)


  //  We need to add few original urls
  //  e.g password-recovery, landing page...
  const initPageRoute = {
    path: '/',
    name: 'InitPage',
    component: props => <NamedRedirect name="LandingPage" params={{ ...props.params }} />,
  }
  const originalSearchListingPage = {
    path: '/s/listings',
    name: 'SearchListingsPage',
    component: props => <NamedRedirect name="SearchListingsPage" params={{ ...props.params }} />,
    loadData: SearchPage.loadData,
  };

  const originRecoveryPassword = {
    path: '/recover-password',
    name: 'originRecoveryPassword',
    component: props => <NamedRedirect name="PasswordRecoveryPage" params={{ ...props.params }} />,
  };

  const originPasswordResetPage = {
    path: '/reset-password',
    name: 'originPasswordResetPage',
    component: props => <NamedRedirect name="PasswordResetPage" {...props} />,
  };

  const originPasswordChangePage = {
    path: '/account/change-password',
    name: 'originPasswordChangePage',
    auth: true,
    authPage: 'LoginPage',
    component: props => <NamedRedirect name="PasswordChangePage" params={{ ...props.params }} />,
  };

  const originEmailVerificationPage = {
    path: '/verify-email',
    name: 'originEmailVerificationPage',
    auth: true,
    authPage: 'LoginPage',
    component: props => <NamedRedirect name="EmailVerificationPage" params={{ ...props.params }} />,
    loadData: EmailVerificationPage.loadData,
  };

  const originYotiVerificationPage = {
    path: '/yoti-verified',
    name: 'originYotiVerificationPage',
    auth: true,
    authPage: 'LoginPage',
    component: props => <NamedRedirect name="yotiVerificationPage" params={{ ...props.params }} />,
  };
  const faqPage = {
    path: '/faq',
    name: 'originFaqPage',
    component: props => <NamedRedirect name="FaqPage" params={{ ...props.params }} />,
  }

  const faqProfessionalPage = {
    path: '/professionals-faq',
    name: 'originProfessionalsPage',
    component: props => <NamedRedirect name="ProfessionalsPage" params={{ ...props.params }} />,
  }

  const faqOnwerPage = {
    path: '/owners-faq',
    name: 'originOwnersPage',
    component: props => <NamedRedirect name="OwnersPage" params={{ ...props.params }} />,
  }
  const saleDetailsPage = {
    path: '/sale/:id/details',
    name: 'originSaleDetailsPage',
    auth: true,
    authPage: 'LoginPage',
    component: props => <NamedRedirect name="SaleDetailsPage" params={{ ...props.params }} />,
  }

  const orderDetailsPage = {
    path: '/order/:id/details',
    name: 'originOrderDetailsPage',
    auth: true,
    authPage: 'LoginPage',
    component: props => <NamedRedirect name="OrderDetailsPage" params={{ ...props.params }} />,
  };
  const additionalRoutes = [
    initPageRoute,
    originalSearchListingPage,
    originRecoveryPassword,
    originPasswordResetPage,
    originPasswordChangePage,
    originEmailVerificationPage,
    originYotiVerificationPage,
    faqPage,
    faqProfessionalPage,
    faqOnwerPage,
    saleDetailsPage,
    orderDetailsPage
  ]

  // console.log('updatedRoutes', updatedRoutes)
  return updatedRoutes.concat(additionalRoutes)


};

export default routeConfiguration;
