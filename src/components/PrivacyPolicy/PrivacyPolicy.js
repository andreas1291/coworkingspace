import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './PrivacyPolicy.css';

const PrivacyPolicy = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <p className={css.lastUpdated}>Last updated: October 30, 2017</p>

      <p>
        Coworkertime is an online marketplace to vconect coworkers with coworkingspaces.
        This community rules and conditions are for any users valid and part of the agreement
         between users and Coworkertime. Fraudulent or illegal activity may also be subject to
         legal action taken. We reserve the right to also edit or remove content on our site
         that violates these Community rules or if we believe it adversely affects the integrity
         of the Coworkertime marketplace or it’s users.
      </p>

      <h2 style={{ fontStyle: "bolder" }}>Coworkingspaces must:</h2>

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
      </p>


      <h2 style={{ fontStyle: "bolder" }}>Coworkers must:</h2>

      <h2>1. Comply with all Coworkertime rules, conditions policies and booking agreement.</h2>
      <p>
        All coworkers and those that have booked a coworkingspace through Coworkertime must
        only use the coworkingspaces as described by the spaces listing owner, and as agreed upon in the booking agreement.
        Coworkingspaces take pride in their space, the equipment, and their profession and will be
        expecting the same professional respect and courtesy that they are providing.
      </p>

      <h2>2. Never engage in illegal or prohibited activity on Coworkingspaces premises.</h2>
      <p>
        All local laws are enforceable and coworkingspace owners can notify authorities
        if laws are veing broken on their property or on their studi permises. Never engage
        in any illegal activity on coworkingspace property or permises.
      </p>

      <h2 style={{ fontStyle: "bolder" }}>Everyone must:</h2>

      <h2>1. Communicate transparent and honestly.</h2>
      <p>
        Coworkertime is a marketplace who attach great importance to a transparent and honest communication.
        It’s a great benefit for the platform, and their users to communicate in every case transparent and honestly.
        It increases the security for all users and providers and also it create trust.
        If there are some peoples who don’t accept the rules, they will be locked out of thic community.
      </p>

      <h2>2. Transact honestly and only with the meaning of Coworkertime</h2>
      <p>
        Coworkertime is a marketplace to book coworkingspaces and to connect coworkers with their spaces.
        If this platform will use for other transactions which are not in the meaning of Coworkertime,
        the involved users are blocked from this website and the accounts will be deleted by Coworkertime.
        If there are illegal activities, Coworkertime will report it to the official local authorities.
      </p>
      <p>
        All users and transactions are also applicable to the Terms of Service that is agreed upon by using the platform.
      </p>


      <h2 style={{ fontStyle: "bolder" }}>Coworkingspace Fees:</h2>

      <h2>1. Coworkingspace listing subscription fees</h2>
      <p>
        We currently require a subscription to list your coworkingspace on Coworkertime and the monthly
        subscriptions start at $20/month.We value each and every coworkingspace part of our community and
        if you feel that we can not offer a service that you are willing to support with for $20/month,
        you can cancel your subscription at any time. If you have paid in advance using the semi-annual or annual billing options,
        we will refund you amount that was pre-paid in advance of the current date at the time of cancellation.
      </p>

      <h2>2. coworkingspace booking transaction fees</h2>
      <p>
        Coworkertime retains 10% of each booking as a transaction fee.
        This amount is deducted from the booking total amount when you accept a booking request.
        Please make sure that you also included all local taxes, fees, and account for any other expenses in your hourly price offered,
        since Coworkertime does not and is not liable to pay for these. You are also responsible for
        reporting all income generated from coworkingspace-bookings per government and local regulations and codes.
         We may withhold a booking transaction in the event of a dispute or other event per the Services Agreement.
      </p>

      <h2>3. Coworkers (Booking) Fees:</h2>
      <p>
        Coworkertime charges 10% for the total of each booking as a service fee.
        This amount is automatically added to the total amount shown on the booking
        total prior to a booking request being sent. This amount is charged to the account you entered
        for payment when a booking request is accepted. All booking requests will automatically expire 24 hours
        after sent if not accepted by the studio listing owner. In the event of a dispute or other event,
        the transaction amount may be withheld per the Services Agreement.
      </p>

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

export default PrivacyPolicy;
