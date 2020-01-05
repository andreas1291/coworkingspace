import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import { injectIntl, intlShape, FormattedMessage } from '../../util/reactIntl';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';

import css from './FaqPage.css';



const faq = [
  {
    id: "open1",
    inputId: "collapsible1",
    labelId: "collapsible1",
    title: "1.	What is Coworkertime",
    content: [
      "Coworkertime is a online community to book coworkingspaces. Our mission is to help Coworkingspaces around the world to increase her reach. Also we are dedicated to create an added value for Coworker and coworkingspace owner. Its worldwide the easiest way to find and book coworkingspaces."
    ]
  },
  {
    id: "open2",
    inputId: "collapsible2",
    labelId: "collapsible2",
    title: "2.	How does Coworkertime work?",
    content: [
      "Coworkertime is a marketplace to book some of the best coworkingspaces worldwide. We connect coworker with beautiful workingspaces everywhere.",
      "Coworker can search coworkingspaces, request to book and book and pay through our platform. "
    ]
  },
  {
    id: "open3",
    inputId: "collapsible3",
    labelId: "collapsible3",
    title: "3.	What does Coworkertime do?",
    content: [
      "Our marketplace is a platform that allows anyone to create an account in minutes, discover coworkingspaces, request a time, book, and pay without any hassles. For coworkingspaces, we make it easy to add your space, manage booking requests, message directly with coworkers, and accept payments."
    ]
  },
  {
    id: "open4",
    inputId: "collapsible4",
    labelId: "collapsible4",
    title: "4.	Why should I use Coworkertime?",
    content: [
      "If you are a coworkingspace It’s very simple and easy. In that we are a platform for you to share your Coworkingspace with coworker around the word, increase your bookings and revenue, and easily manage your bookings and payments."
    ]
  },
  {
    id: "open5",
    inputId: "collapsible5",
    labelId: "collapsible5",
    title: "5.	Do I need to create an account?",
    content: [
      "You can browse and explore Coworkertime without an account. You need an account to message a coworkingspace, to book and pay or request for a Coworkertime. Also you need an account to publish a new coworkingspace."
    ]
  },
  {
    id: "open6",
    inputId: "collapsible6",
    labelId: "collapsible6",
    title: "6.	Is it free to list my coworkingspace?",
    content: [
      "To list your coworkingspae you need to be part of the basic plan, which is about 20$ / month."
    ]
  },
  {
    id: "open7",
    inputId: "collapsible7",
    labelId: "collapsible7",
    title: "7.	What countries do you support?",
    content: [
      "We are an online marketplace for coworkingspaces which is open worldwide. We are a company located in Switzerland."
    ]
  },
  {
    id: "open8",
    inputId: "collapsible8",
    labelId: "collapsible8",
    title: "8.	How do I add my coworkingspace?",
    content: [
      "Adding your coworkingspace is easy and only takes a few minutes. After created an account you can select a subscription. We do require a monthly subscription to list have a coworkingspace listing. After you select a subscription, simply click the “Add your coworkingspace” at the top right. Please note that all listings are subject to review by our team to ensure the safety of our community. Once you submit your listing for review, we will approve it within 24 hours. "
    ]
  },
  {
    id: "open9",
    inputId: "collapsible9",
    labelId: "collapsible9",
    title: "9.	How much is it to add my coworkingspace?",
    content: [
      "We charge a monthly fee which starts at 20$/month. "
    ]
  },
  {
    id: "open10",
    inputId: "collapsible10",
    labelId: "collapsible10",
    title: "10.	Do you charge a transaction fee for bookings?",
    content: [
      "We charge a transaction fee of 10% for all bookings completed on Coworkertime. This fee is automatically deducted from your booking total once you accept the request."
    ]
  },
  {
    id: "open11",
    inputId: "collapsible11",
    labelId: "collapsible11",
    title: "11.	How can I add multiple rooms that I have at my studio?",
    content: [
      "We would love for you to add multiple rooms, coworkingspaces, or locations to Coworkertime! This has been a common request in the past and why we made our premium subscription package. With this subscription, we can also help you get started adding your listings and provide you with more support, marketing reach, and also typically booking requests. You must have a premium subscription to have multiple listings."
    ]
  },
  {
    id: "open12",
    inputId: "collapsible12",
    labelId: "collapsible12",
    title: "12.	How can I modify a booking request?",
    content: [
      "Once a booking request is sent, the dates, amount, and details of the booking request cannot be modified. "
    ]
  },
  {
    id: "open13",
    inputId: "collapsible13",
    labelId: "collapsible13",
    title: "13.	When is a booking confirmed?",
    content: [
      "A booking is confirmed once indicated as completed by the coorkingspace listing owner."
    ]
  },
  {
    id: "open14",
    inputId: "collapsible14",
    labelId: "collapsible14",
    title: "14.	Do I have to communicate on Studiotime?",
    content: [
      "Yes, we ask that you never take communication outside of our platform messaging and never give your contact information prior to entering a Booking Agreement."
    ]
  },
  {
    id: "open15",
    inputId: "collapsible15",
    labelId: "collapsible15",
    title: "15.	Do I need an insurance for my coworkingspace?",
    content: [
      "Yes, you should have an insurance policy in place for your coworkingspace prior to listing it on Coworkertime."
    ]
  },
  {
    id: "open16",
    inputId: "collapsible16",
    labelId: "collapsible16",
    title: "16.	Does Coworkertime offer an insurance?",
    content: [
     "No, Coworkertime does not offer any insurance for bookings and equipment or inventories. Every provider is self-responsible to have an insurance for their coworkingspaces."
    ]
  },
  {
    id: "open17",
    inputId: "collapsible17",
    labelId: "collapsible17",
    title: "17.	Can we require coworker to have their own insurance in order to book my coworkingspace?",
    content: [
      "Yes, you can require that coworkers have their own insurance policy in place for them to book your coworkingspace. In the event that you require this, please mention this in your description, notify all booking requests of this requirement, and also receive proof of insurance to verify this prior to accepting a booking."
    ]
  },
  {
    id: "open18",
    inputId: "collapsible18",
    labelId: "collapsible18",
    title: "18.	How do I create an account?",
    ul: {
      title: "You can create a user account in minutes doing the following:",
      content: [
        "1.	Click “Log in” at the top right",
        "2.	Enter your email address and create a secure password",
        "3.	Please check the email address you entered and confirm you email"
      ]
    }
  }
]


const Accordian = props => {
  const { id, inputId, labelId, title, content, ul, accordianIndex } = props
  const { title: subTitle, content: subContent } = ul !== undefined?ul:{}
  return (
    <div id={id} className={css.wrapCollabsible}>
      <input id={inputId} className={css.toggle} type="checkbox"  />
      <label for={labelId} className={css.lblToggle}>
        <span className={css.collapsibleTitle}>
          {intl.formatMessage({ id: `FaqPage.panel${accordianIndex+1}.title` })}
        </span>
      </label>
      <div className={css.collapsibleContent}>
        <div className={css.contentInner}>
          {
            content !== undefined?
              content.map((item, index) => (
                <p>
                  {intl.formatMessage({ id: `FaqPage.panel${accordianIndex+1}.content.text${index+1}` })}
                </p>
              ))
              :null
          }
          {
            ul !== undefined?
              (
                <React.Fragment>
                  <h3>{subTitle}</h3>
                  <ul>
                    {
                      subContent.map(item => (
                        <li>
                          {intl.formatMessage({ id: `FaqPage.panel${accordianIndex+1}.ul.text${index+1}` })}
                        </li>
                      ))
                    }
                  </ul>
                </React.Fragment>
              )
              :null
          }
        </div>
      </div>
    </div>
  )
}
const FaqPage = () => {


  // prettier-ignore
  return (
    <StaticPage
      title="Home FAQ | Coworkingspace"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'HomeFaqPage',
        description: 'Frequently Asked Questions',
        name: 'HomeFaqPage',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>
          <LayoutWrapperMain className={css.staticPageWrapper}>
            <div className={css.sectionContent}>
              <div className={css.pageInfo}>
                <div>
                  <h1 className={css.title}>Have questions? We're here to help!</h1>
                  <h2 className={css.subTitle}>General Questions</h2>
                </div>
                <div className={css.faqRow}>
                  <div className={css.rightContent}>
                    <div className={css.contentWrapper}>
                      <div className={css.contentMain}>
                        {
                          faq.map((faqItem, index) => {
                            return (
                              <Accordian accordianIndex={index}  {...faqItem} />
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>
                </div>
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

export default injectIntl(FaqPage);
