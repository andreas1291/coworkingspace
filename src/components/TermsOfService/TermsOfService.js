import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './TermsOfService.css';

const TermsOfService = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <p className={css.lastUpdated}>Last updated: October 30, 2019</p>
      <p>
        These terms and conditions ("Terms", "Agreement") are an agreement between Website Operator
        ("Website Operator", "us", "we" or "our") and you ("User", "you" or "your").
        This Agreement sets forth the general terms and conditions of your use of the coworkertime.com website
        and any of its products or services (collectively, "Website" or "Services").
      </p>

      <h2>1 Accounts and membership</h2>
      <p>
        You must be at least 18 years of age to use this Website.
        By using this Website and by agreeing to this Agreement you
        warrant and represent that you are at least 18 years of age.
        If you create an account on the Website, you are responsible for maintaining
        the security of your account and you are fully responsible for all activities
        that occur under the account and any other actions taken in connection with it.
        We may, but have no obligation to, monitor and review new accounts before you may sign in and use our Services.
        Providing false contact information of any kind may result in the termination of your account.
        You must immediately notify us of any unauthorized uses of your account or any other breaches of security.
        We will not be liable for any acts or omissions by you, including any damages of any
        kind incurred as a result of such acts or omissions. We may suspend, disable, or delete your account (or any part thereof)
        if we determine that you have violated any provision of this Agreement or that your conduct or content would tend to
        damage our reputation and goodwill. If we delete your account for the foregoing reasons, you may not re-register
        for our Services. We may block your email address and Internet protocol address to prevent further registration.
      </p>

      <h2>2 User content</h2>
      <p>
        We do not own any data, information or material ("Content") that you submit on the Website in the course
        of using the Service. You shall have sole responsibility for the accuracy, quality, integrity, legality, reliability,
        appropriateness, and intellectual property ownership or right to use of all submitted Content.
        We may, but have no obligation to, monitor and review Content on the Website submitted or created using our Services by you.
        Unless specifically permitted by you, your use of the Website does not grant us the license to use, reproduce, adapt, modify,
        publish or distribute the Content created by you or stored in your user account for commercial, marketing or
        any similar purpose. But you grant us permission to access, copy, distribute, store, transmit, reformat, display
        and perform the Content of your user account solely as required for the purpose of providing the Services to you.
        Without limiting any of those representations or warranties, we have the right, though not the obligation, to, in our own sole discretion,
        refuse or remove any Content that, in our reasonable opinion, violates any of our policies or is in any way harmful or objectionable.
      </p>

      <h2>3 Billing and payments</h2>
      <p>
        You shall pay all fees or charges to your account in accordance with the fees, charges, and billing terms
        in effect at the time a fee or charge is due and payable. If auto-renewal is enabled for the Services you have subscribed for,
        you will be charged automatically in accordance with the term you selected. If, in our judgment,
        your purchase constitutes a high-risk transaction, we will require you to provide us with a copy of your valid government-issued photo identification,
        and possibly a copy of a recent bank statement for the credit or debit card used for the purchase.
        We reserve the right to change products and product pricing at any time. We also reserve the right to refuse any order you place with us. We may,
        in our sole discretion, limit or cancel quantities purchased per person, per household or per order.
        These restrictions may include orders placed by or under the same customer account, the same credit card,
        and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order,
        we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made.
      </p>

      <h2>4 Accuracy of information</h2>
      <p>
        Occasionally there may be information on the Website that contains typographical errors,
        inaccuracies or omissions that may relate to product descriptions, pricing, availability,
        promotions and offers. We reserve the right to correct any errors, inaccuracies or omissions,
        and to change or update information or cancel orders if any information on the Website or on any related Service
        is inaccurate at any time without prior notice (including after you have submitted your order).
        We undertake no obligation to update, amend or clarify information on the Website including, without limitation,
        pricing information, except as required by law. No specified update or refresh date applied on the Website should be taken
        to indicate that all information on the Website or on any related Service has been modified or updated.
      </p>

      <h2>5 Third-party services</h2>
      <p>
        If you decide to enable, access or use third-party services, be advised that your access and use
        of such other services are governed solely by the terms and conditions of such other services,
        and we do not endorse, are not responsible or liable for, and make no representations as to any aspect of
        such other services, including, without limitation, their content or the manner in which they handle data (including your data)
        or any interaction between you and the provider of such other services.
        You irrevocably waive any claim against Website Operator with respect to such other services.
        Website Operator is not liable for any damage or loss caused or alleged to be caused by or in connection
        with your enablement, access or use of any such other services, or your reliance on the privacy practices,
        data security processes or other policies of such other services.
        You may be required to register for or log into such other services on their respective websites.
        By enabling any other services, you are expressly permitting Website Operator to disclose
        your data as necessary to facilitate the use or enablement of such other service.
      </p>

      <h2>6 Backups</h2>
      <p>
        We are not responsible for Content residing on the Website. In no event shall we be held liable for any loss of any Content.
        It is your sole responsibility to maintain appropriate backup of your Content.
        Notwithstanding the foregoing, on some occasions and in certain circumstances,
        with absolutely no obligation, we may be able to restore some or all of your data that has been deleted as of a certain date
        and time when we may have backed up data for our own purposes. We make no guarantee that the data you need will be available.
      </p>

      <h2>7 Advertisements</h2>
      <p>
        During use of the Website, you may enter into correspondence with or participate in promotions of advertisers
        or sponsors showing their goods or services through the Website. Any such activity, and any terms, conditions,
        warranties or representations associated with such activity, is solely between you and the applicable third-party.
        We shall have no liability, obligation or responsibility for any such correspondence, purchase or promotion between you and any such third-party.
      </p>

      <h2>8 Links to other websites</h2>
      <p>
        Although this Website may link to other websites, we are not, directly or indirectly, implying any approval, association,
        sponsorship, endorsement, or affiliation with any linked website, unless specifically stated herein.
        We are not responsible for examining or evaluating, and we do not warrant the offerings of, any businesses
        or individuals or the content of their websites. We do not assume any responsibility or liability for the actions,
        products, services, and content of any other third-parties. You should carefully review the legal statements
        and other conditions of use of any website which you access through a link from this Website.
        Your linking to any other off-site websites is at your own risk.
      </p>

      <h2>9 Prohibited uses</h2>
      <p>
        In addition to other terms as set forth in the Agreement, you are prohibited from using the Website or its Content:
        (a) for any unlawful purpose;
        (b) to solicit others to perform or participate in any unlawful acts;
        (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances;
        (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others;
        (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion,
        ethnicity, race, age, national origin, or disability;
        (f) to submit false or misleading information;
        (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way
        that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet;
        (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape;
        (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related website,
        other websites, or the Internet. We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.
      </p>

      <h2>10 Intellectual property rights</h2>
      <p>
        This Agreement does not transfer to you any intellectual property owned by Website Operator or third-parties,
        and all rights, titles, and interests in and to such property will remain (as between the parties) solely with Website Operator.
        All trademarks, service marks, graphics and logos used in connection with our Website or Services,
        are trademarks or registered trademarks of Website Operator or Website Operator licensors. Other trademarks,
        service marks, graphics and logos used in connection with our Website or Services may be the trademarks of other third-parties.
        Your use of our Website and Services grants you no right or license to reproduce or otherwise use any Website Operator or third-party trademarks.
      </p>

      <h2>11 Disclaimer of warranty</h2>
      <p>
        You agree that your use of our Website or Services is solely at your own risk.
        You agree that such Service is provided on an "as is" and "as available" basis.
        We expressly disclaim all warranties of any kind, whether express or implied,
        including but not limited to the implied warranties of merchantability, fitness for a particular purpose and non-infringement.
        We make no warranty that the Services will meet your requirements, or that the Service will be uninterrupted,
        timely, secure, or error-free; nor do we make any warranty as to the results that may be obtained from the use of the Service
        or as to the accuracy or reliability of any information obtained through the Service or that defects in the Service will be corrected.
        You understand and agree that any material and/or data downloaded or otherwise obtained
        through the use of Service is done at your own discretion and risk and that you will be solely responsible for any damage to your computer system
        or loss of data that results from the download of such material and/or data. We make no warranty regarding any goods or services purchased
        or obtained through the Service or any transactions entered into through the Service. No advice or information, whether oral or written,
        obtained by you from us or through the Service shall create any warranty not expressly made herein.
      </p>

      <h2>12 Limitation of liability</h2>
      <p>
        To the fullest extent permitted by applicable law, in no event will Website Operator,
        its affiliates, officers, directors, employees, agents, suppliers or licensors be liable to any person for
        (a): any indirect, incidental, special, punitive, cover or consequential damages (including, without limitation, damages for lost profits,
        revenue, sales, goodwill, use of content, impact on business, business interruption, loss of anticipated savings, loss of business opportunity)
        however caused, under any theory of liability, including, without limitation, contract, tort, warranty, breach of statutory duty,
        negligence or otherwise, even if Website Operator has been advised as to the possibility of such damages
        or could have foreseen such damages. To the maximum extent permitted by applicable law, the aggregate liability of Website Operator
        and its affiliates, officers, employees, agents, suppliers and licensors, relating to the services will be limited
        to an amount greater of one dollar or any amounts actually paid in cash by you to Website Operator for the prior
        one month period prior to the first event or occurrence giving rise to such liability. The limitations and exclusions
        also apply if this remedy does not fully compensate you for any losses or fails of its essential purpose.
      </p>

      <h2>13 Indemnification</h2>
      <p>
        You agree to indemnify and hold Website Operator and its affiliates, directors, officers,
        employees, and agents harmless from and against any liabilities, losses, damages or costs,
        including reasonable attorneys' fees, incurred in connection with or arising from any third-party
        allegations, claims, actions, disputes, or demands asserted against any of them as a result of or relating
        to your Content, your use of the Website or Services or any willful misconduct on your part.
      </p>

      <h2>14 Severability</h2>
      <p>
        All rights and restrictions contained in this Agreement may be exercised
        and shall be applicable and binding only to the extent that they do not violate any applicable laws
        and are intended to be limited to the extent necessary so that they will not render this Agreement illegal,
        invalid or unenforceable. If any provision or portion of any provision of this Agreement shall be held to be illegal,
        invalid or unenforceable by a court of competent jurisdiction, it is the intention of the parties that the remaining
        provisions or portions thereof shall constitute their agreement with respect to the subject matter hereof,
        and all such remaining provisions or portions thereof shall remain in full force and effect.
      </p>

      <h2>15 Dispute resolution</h2>
      <p>
        The formation, interpretation, and performance of this Agreement and any disputes arising out
        of it shall be governed by the substantive and procedural laws of Sankt Gallen,
        Switzerland without regard to its rules on conflicts or choice of law and, to the extent applicable,
        the laws of Switzerland. The exclusive jurisdiction and venue for actions related to the subject matter
        hereof shall be the state and federal courts located in Sankt Gallen, Switzerland, and you hereby submit
        to the personal jurisdiction of such courts. You hereby waive any right to a jury trial in any proceeding
        arising out of or related to this Agreement. The United Nations Convention on Contracts for the International
        Sale of Goods does not apply to this Agreement.
      </p>

      <h2>16 Assignment</h2>
      <p>
        You may not assign, resell, sub-license or otherwise transfer or delegate any of your rights
        or obligations hereunder, in whole or in part, without our prior written consent,
        which consent shall be at our own sole discretion and without obligation; any such assignment
        or transfer shall be null and void. We are free to assign any of its rights or obligations hereunder,
        in whole or in part, to any third-party as part of the sale of all or substantially all of its assets or stock or as part of a merger.
      </p>

      <h2>17 Changes and amendments</h2>
      <p>
        We reserve the right to modify this Agreement or its policies relating to the Website or Services at any time,
        effective upon posting of an updated version of this Agreement on the Website. When we do, we will send you an email to notify you.
        Continued use of the Website after any such changes shall constitute your consent to such changes.
      </p>

      <h2>18 Acceptance of these terms</h2>
      <p>
        You acknowledge that you have read this Agreement and agree to all its terms and conditions.
        By using the Website or its Services you agree to be bound by this Agreement.
        If you do not agree to abide by the terms of this Agreement, you are not authorized to use or access the Website and its Services.
      </p>

      <h2>19 Contacting us</h2>
      <p>
        If you would like to contact us to understand more about this Agreement or wish to contact us concerning
        any matter relating to it, you may send an email to info@coworkertime.com

        This document was last updated on November 10, 2019
      </p>

      <h1> Acceptable use policy </h1>
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
        <li> •
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
      </p>
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

export default TermsOfService;
