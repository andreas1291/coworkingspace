import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { injectIntl, intlShape, FormattedMessage } from '../../util/reactIntl';
import css from './TermsOfService.css';

const TermsOfService = props => {
  const { rootClassName, className, intl } = props;
  const classes = classNames(rootClassName || css.root, className);
  
  const indexAry = [
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19], 
    [
      [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
      [1,2,3,4],
      [1,2,3,4,5],
      4,5,
      [1,2,3,4,5,6],
      7,
      [1,2,3,4],
      9,10,11,12
    ]
  ];
  // prettier-ignore
  return (
    <div className={classes}>
      {
        indexAry.map((subItem, index) => (
          <React.Fragment>
            <h1 className={css.heading}>
              <FormattedMessage id={`TermsOfService.panel${index+1}.heading`} />
            </h1>
            {
              !index?(
                <p className={css.lastUpdated}>
                { intl.formatMessage({ id: `TermsOfService.panel${index+1}.postDate` }) }
                </p>
              ): null
            }
            <p> 
            { intl.formatMessage({ id: `TermsOfService.panel${index+1}.description` }) }
            </p>
            {
              subItem.map((ul, subIndex) => (
                  <React.Fragment>
                    <h2> { intl.formatMessage({ id: `TermsOfService.panel${index+1}.option${subIndex+1}.heading` }) } </h2>
                    <p>
                    { intl.formatMessage({ id: `TermsOfService.panel${index+1}.option${subIndex+1}.content` }) }
                    </p>
                    {
                      typeof subItem == "array"?(
                        <ul className={css.termsList}>
                        {
                          ul.map((ul, liIndex) => (
                            <li>{ intl.formatMessage({ id: `TermsOfService.panel${index+1}.option${subIndex+1}.subContent${liIndex+1}` }) }</li>
                          ))
                        }
                        </ul>
                      ):null
                    }
                  </React.Fragment>
                )
              )
            }
          </React.Fragment>
        ))
      }

      {/* <h1> Acceptable use policy </h1>
      <p>
        These acceptable use policy ("Acceptable Use Policy", "AUP", "Policy") is an agreement between Website Operator
        ("Website Operator", "us", "we" or "our") and you ("User", "you" or "your").
        This Policy sets forth the general guidelines and acceptable and prohibited uses of the coworkertime.com website
        and any of its products or services (collectively, "Website" or "Services").
      </p>

      <h2>1 Prohibited activities and uses</h2>
      <p>
        You may not use the Services to publish content or engage in activity that
        is illegal under applicable law, that is harmful to others, or that would subject us to liability, including,
        without limitation, in connection with any of the following, each of which is prohibited under this Policy:
      </p>
      <ul className={css.termsList}>
        <li>Distributing malware or other malicious code.</li>
        <li>Disclosing sensitive personal information about others.</li>
        <li>Collecting, or attempting to collect, personal information about third parties without their knowledge or consent.</li>
        <li>Distributing pornography or adult related content.</li>
        <li>Promoting or facilitating prostitution or any escort services.</li>
        <li>Hosting, distributing or linking to child pornography or content that is harmful to minors.</li>
        <li>Promoting or facilitating gambling, violence, terrorist activities or selling weapons or ammunition.</li>
        <li>Engaging in the unlawful distribution of controlled substances, drug contraband or prescription medications.</li>
        <li>Managing payment aggregators or facilitators such as processing payments on behalf of other businesses or charities.</li>
        <li>Facilitating pyramid schemes or other models intended to seek payments from public actors.</li>
        <li>Threatening harm to persons or property or otherwise harassing behavior.</li>
        <li>Purchasing any of the offered Services on someone else’s behalf.</li>
        <li>Misrepresenting or fraudulently representing products or services.</li>
        <li>Infringing the intellectual property or other proprietary rights of others.</li>
        <li>Facilitating, aiding, or encouraging any of the above activities through our Services.</li>
      </ul>

      <h2>2 System abuse</h2>
      <p>
        Any User in violation of our Services security is subject to criminal and civil liability,
        as well as immediate account termination. Examples include, but are not limited to the following:
      </p>
      <ul className={css.termsList}>
        <li>Use or distribution of tools designed for compromising security of the Services.</li>
        <li>Intentionally or negligently transmitting files containing a computer virus or corrupted data.</li>
        <li>Accessing another network without permission, including to probe or scan for vulnerabilities or breach security or authentication measures.</li>
        <li>Unauthorized scanning or monitoring of data on any network or system without proper authorization of the owner of the system or network.</li>
      </ul>

      <h2>3 Service resources</h2>
      <p>
        You may not consume excessive amounts of the Services or use the Services in any way which results
        in performance issues or which interrupts the services for other Users. Prohibited activities
        that contribute to excessive use, include without limitation:
      </p>
      <ul className={css.termsList}>
        <li>Deliberate attempts to overload the Services and broadcast attacks (i.e. denial of service attacks).</li>
        <li>Engaging in any other activities that degrade the usability and performance of our Services.</li>
        <li>Hosting or running malicious code or other scripts or processes that adversely impact our Services.</li>
        <li>Operating a file sharing site or scripts for BitTorrent or similar, which includes sending or receiving files containing these mechanisms.</li>
        <li>Web proxy scripts, such as those that allow anyone to browse to a third-party website anonymously, are prohibited.</li>
      </ul>

      <h2>4 No spam policy</h2>
      <p>
        You may not use our Services to send spam or bulk unsolicited messages.
        We maintain a zero tolerance policy for use of our Services in any manner associated with the transmission,
        distribution or delivery of unsolicited bulk or unsolicited commercial e-mail, or the sending, assisting,
        or commissioning the transmission of commercial e-mail that does not comply with the U.S. CAN-SPAM Act of 2003 ("SPAM").
        Your products or services advertised via SPAM (i.e. Spamvertised) may not be used in conjunction with our Services.
        This provision includes, but is not limited to, SPAM sent via fax, phone, postal mail, email, instant messaging, or newsgroups.
        Sending emails through our Services to purchased email lists ("safe lists") will be treated as SPAM.
        We may terminate the Service of any User who sends out SPAM with or without notice.
      </p>

      <h2>5 Defamation and objectionable content</h2>
      <p>
        We value the freedom of expression and encourages Users to be respectful with the content they post.
        We are not a publisher of User content and are not in a position to investigate the veracity of individual
        defamation claims or to determine whether certain material, which we may find objectionable, should be censored.
        However, we reserve the right to moderate, disable or remove any content to prevent harm to others or to us or our Services,
        as determined in our sole discretion.
      </p>

      <h2>6 Copyrighted content</h2>
      <p>
        Copyrighted material must not be published via our Services without the explicit permission of the copyright owner
        or a person explicitly authorized to give such permission by the copyright owner. Upon receipt of a claim for copyright infringement,
        or a notice of such violation, we will immediately run full investigation. However, we generally require a court order from a court of competent jurisdiction,
        as determined by us in our sole discretion, to take down alleged infringing material from the Services.
        We may terminate the Service of Users with repeated copyright infringements. Further procedures may be carried out if necessary.
        We will assume no liability to any User of the Services for the removal of any such material.
      </p>
      <p>
        If you believe your copyright is being infringed by a person or persons using our Services,
        please send a report of the copyright infringement to the contact details listed at the end of this Policy.
        Your notice must include the following:
      </p>
      <ul className={css.termsList}>
        <li>
          Identification of the copyrighted work claimed to have been infringed,
          or if multiple copyrighted words at a single site are covered by a single notification,
          a representative list of such works at that site.
        </li>
        <li>
          Identification of the copyrighted work claimed to have been infringed,
          or if multiple copyrighted words at a single site are covered by a single notification,
          a representative list of such works at that site.
        </li>
        <li>
          Information reasonably sufficient to permit us to contact you,
          such as an address, telephone number, and, if available, an e-mail address.
        </li>
        <li>
          A statement that you have a good faith belief that use of the material in the manner complained
          of is not authorized by the copyright owner, the copyright owner's agent, or the law.
        </li>
        <li>
          A statement that the information in the notification is accurate,
          and under penalty of perjury that you are authorized to act on behalf of
          the owner of an exclusive right that is allegedly infringed.
        </li>
        <li>
          A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.
        </li>
      </ul>



      <h2>7 Security</h2>
      <p>
        You take full responsibility for maintaining reasonable security precautions for your account.
        You are responsible for protecting and updating any login account provided to you for our Services.
        You must protect the confidentiality of your login details, and you should change your password periodically.
        You are responsible for ensuring all User provided software installed by you
        on our Services is updated and patched following industry best practice.
      </p>

      <h2>8 Enforcement</h2>
      <p>
        We reserve our right to be the sole arbiter in determining the seriousness
        of each infringement and to immediately take corrective actions, including but not limited to:
      </p>
      <ul className={css.termsList}>
        <li>
          Suspending or terminating your Service with or without notice upon any violation of this Policy.
          Any violations may also result in the immediate suspension or termination of your account.
        </li>
        <li>
          Disabling or removing any content which is prohibited by this Policy,
          including to prevent harm to others or to us or our Services, as determined by us in our sole discretion.
        </li>
        <li>
          Reporting violations to law enforcement as determined by us in our sole discretion.
        </li>
        <li>
          A failure to respond to an email from our abuse team within 2 days,
          or as otherwise specified in the communication to you,
          may result in the suspension or termination of your Services.
        </li>
      </ul>
      <p>
        Suspended and terminated User accounts due to violations will not be re-activated.
        Nothing contained in this Policy shall be construed to limit our actions or remedies
        in any way with respect to any of the prohibited activities. We reserve the right to take any
        and all additional actions we may deem appropriate with respect to such activities,
        including without limitation taking action to recover the costs and expenses of identifying offenders
        and removing them from our Services, and levying cancellation charges to cover our costs.
        In addition, we reserve at all times all rights and remedies available to us with respect to such activities at law or in equity.
      </p>

      <h2>8 Reporting violations</h2>
      <p>
        If you have discovered and would like to report a violation of this Policy,
        please contact us immediately. We will investigate the situation and provide you with full assistance.
      </p>

      <h2>9 Changes and amendments</h2>
      <p>
        We reserve the right to modify this Policy or its terms relating to the Website or Services at any time,
        effective upon posting of an updated version of this Policy on the Website.
        When we do, we will send you an email to notify you. Continued use of the Website after any such changes shall constitute
        your consent to such changes.
      </p>

      <h2>10 Acceptance of this policy</h2>
      <p>
        You acknowledge that you have read this Policy and agree to all its terms and conditions.
        By using the Website or its Services you agree to be bound by this Policy.
        If you do not agree to abide by the terms of this Policy, you are not authorized to use or access the Website and its Services.
      </p>

      <h2>11 Contacting us</h2>
      <p>
        If you would like to contact us to understand more about this Policy or wish to contact us concerning any matter relating to it,
        you may send an email to info@coworkertime.com
      </p>
      <p>
        This document was last updated on November 10, 2019
      </p> */}
    </div>
  );
};

TermsOfService.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

TermsOfService.propTypes = {
  rootClassName: string,
  className: string,
};

export default injectIntl( TermsOfService );
