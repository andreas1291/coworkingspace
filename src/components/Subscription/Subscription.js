
import React, { Component} from 'react';
import classNames from 'classnames';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { FormattedMessage } from '../../util/reactIntl';
import { bool } from 'prop-types';
import NamedLink from '../NamedLink/NamedLink';
import { PrimaryButton } from '../Button/Button';
import css from './Subscription.css'
const tabContents = [
  [
    {
      active:false,
      price:29,
      billingMethod: "basicPlan",
      listings:[
        { one: "One Coworkingspace", two: "Listing"},
        { one: "Booking Tools", two: ""},
        { one: "Coworker messaging", two: "System"},
        { one: "Secure Payments & Payouts", two: ""},
      ],
      buttonLabel: "GET BASIC",
      routeName: "PayoutPreferencesPage",
      info: "Billed monthly"

    },
    {
      active:true,
      price:199,
      billingMethod: "premiumPlan",
      listings:[
        { one: "All Basic Features", two: ""},
        { one: "Premium Verified", two: "Tag "},
        { one: "Priority", two: "Search Results"},
        { one: "Multiple Coworkingspace", two: "Listings"},
        { one: "Marketing ", two: "Reach"},
        { one: "VIP ", two: "Service & Support"},
      ],
      buttonLabel: "GET PREMIUM",
      routeName: "PayoutPreferencesPage",
      info: "Billed monthly"

    },
  ],
  [
    {
      active:false,
      price:23,
      billingMethod: "basicPlan",
      listings:[
        { one: "One Coworkingspace", two: "Listing"},
        { one: "Booking Tools", two: ""},
        { one: "Coworker messaging", two: "System"},
        { one: "Secure Payments & Payouts", two: ""},
      ],
      buttonLabel: "GET BASIC",
      routeName: "PayoutPreferencesPage",
      info: "Billed monthly"

    },
    {
      active:true,
      price:159,
      billingMethod: "premiumPlan",
      listings:[
        { one: "All Basic Features", two: ""},
        { one: "Premium Verified", two: "Tag "},
        { one: "Priority", two: "Search Results"},
        { one: "Multiple Coworkingspace", two: "Listings"},
        { one: "Marketing ", two: "Reach"},
        { one: "VIP ", two: "Service & Support"},
      ],
      buttonLabel: "GET PREMIUM",
      routeName: "PayoutPreferencesPage",
      info: "Billed monthly"

    },
  ],
  // [
  //   {
  //     active: false,
  //     price:20,
  //     billingMethod: "Basic Plan",
  //     listings:[
  //       { one: "One Studio", two: "Listing"},
  //       { one: "Booking Tools", two: ""},
  //       { one: "Artist Messaging", two: "System"},
  //       { one: "Secure Payments & Payouts", two: ""},
  //     ],
  //     buttonLabel: "GET BASIC",
  //     routeName: "PayoutPreferencesPage",
  //     info: "Billed monthly"

  //   },
  //   {
  //     active: true,
  //     price:139,
  //     billingMethod: "Premium Plan",
  //     listings:[
  //       { one: "All Basic Features", two: ""},
  //       { one: "Premium Verified", two: "Tag "},
  //       { one: "Priority", two: "Search Results"},
  //       { one: "Multiple Studio", two: "Listings"},
  //       { one: "Marketing ", two: "Reach"},
  //       { one: "Social Media", two: "Reach"},
  //       { one: "VIP ", two: "Service & Support"},
  //     ],
  //     buttonLabel: "GET PREMIUM",
  //     routeName: "PayoutPreferencesPage",
  //     info: "Billed monthly"

  //   },
  // ]
]

const TabButton = props => {
  const { className, label, active, handleChange, number } = props;
  const classes=classNames(css.tabButton, active?css.active:'')

  return (
    <span className={classes} onClick={() => handleChange(number)}>
      {intl.formatMessage({ id: `SubscriptionPage.${label}` })}
    </span>
  )
}
const TabBTPanel = props => {
  const { className, children } = props;
  return (
    <div className={css.tabBTPanel}>
      {children}
    </div>
  )
}

const TabContentPanel = props => {
  const { className, children, hidden } = props;
  return (
    <div className={css.tabContentPanel} hidden={hidden}>
      {children}
    </div>
  )
}

const TabContentBoard = props => {
  const { className, children } = props;
  return (
    <div className={css.tabBoard}>
      {children}
    </div>
  )
}

const TabContent = props => {
  const { className, active, price, billingMethod, listings, buttonLabel, routeName, info, contentPanelIndex,contentIndex  } = props;
  const classes=classNames(css.tabContent, active?css.active:'')
  return (
    <div className={classes}>
      <span className={css.billingMethod}>
        {intl.formatMessage({ id: `SubscriptionPage.${billingMethod}` })}
      </span>
      <span className={css.priceLabel}><span className={css.price}>${price}</span> /month</span>
      <div className={css.listingBoard}>
        {
          listings.map((listing, index) => {
            const { one, two } = listing;
            return (
              <div key={index} className={css.listing}>&#10004; 
                <span className={css.one}>{intl.formatMessage({ id: `SubscriptionPage.${contentPanelIndex?"annualBilling":"monthlyBilling"}.${billingMethod}${contentIndex}` })}</span>
                {intl.formatMessage({ id: `SubscriptionPage.${contentPanelIndex?"annualBilling":"monthlyBilling"}.${billingMethod}${contentIndex}.caption` })}
              </div>
            )
          })
        }
      </div>
      <div className={css.buttonBoard}>
        <NamedLink name={routeName}>
          <PrimaryButton>{buttonLabel}</PrimaryButton>
        </NamedLink>
      </div>
      <div className={css.infoBoard}>
      <span className={css.info}>{info}</span>
      </div>
    </div>
  )
}



class Subscription extends Component {
  constructor(props){
    super(props);
    this.state={
      showAry: [1,0,0]
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (index) {

    let updatedValue;
    if(index==0) updatedValue=[1,0,0,];
    if(index==1) updatedValue=[0,1,0,];
    if(index==2) updatedValue=[0,0,1,];
    this.setState({showAry: updatedValue})
  }

  render() {
    const active1=this.state.showAry[0];
    const active2=this.state.showAry[1];
    const active3=this.state.showAry[2];
    return (
      <div className={css.board}>
        <TabBTPanel>
          <TabButton number={0} label={"monthlyBilling"} active={active1} handleChange={this.handleChange}/>
          <TabButton number={1} label={"annualBilling"} active={active2} handleChange={this.handleChange}/>
          {/* <TabButton number={2} label={"Yearly billing - save 30%"} active={active3} handleChange={this.handleChange}/> */}
        </TabBTPanel>
        <TabContentBoard>
          {
            tabContents.map((content, index1) => {
              const {} = content;
              return (
                <TabContentPanel key={index1} hidden={!this.state.showAry[index1]} >
                  {
                    content.map((item, index2) => {

                      return (
                        <TabContent key={index2} contentIndex={index2} contentPanelIndex={index1} {...item} />
                      )
                    })
                  }
                </TabContentPanel>
              )
            })
          }
        </TabContentBoard>
      </div>
    )
  }
}

Subscription.defaultProps = {
  showAsPopup: false,
};

Subscription.propTypes = {
  showAsPopup: bool,
};

export default injectIntl(Subscription);
