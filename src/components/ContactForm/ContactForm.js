import React from "react";
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import axios from "axios"; // For making client request.
import PhoneInput from 'react-phone-number-input';
import {
  formatPhoneNumber,
  isValidPhoneNumber,
  formatPhoneNumberIntl,
  getCountryCallingCode,
  parsePhoneNumber,
} from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags'

// import {
//   getSelectedLocation,
//   getLocationInfo,
// } from '../../locationSelect'
// import { etherealSendMail } from '../../nodemailer'
import config from  '../../config'
import css from './ContactForm.css'

const { getCode, getName } = require('country-list');
const { contactEmail, backMailTemplate } = config

class ContactForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      surname: "",
      email: "",
      phoneNumber:"",
      message: "",
      successFlag:""
    };
  }

  handleForm = e => {
    // var sendSuccessFlag =
    //   etherealSendMail(this.state.email, contactEmail, this.state.message)
    //     .then(response => {
    //       return response
    //     }).catch( error => {
    //       return error
    //     });
    // var backSuccessFlag =
    //   etherealSendMail(contactEmail, this.state.email, backMailTemplate)
    //     .then(response => {
    //       return response
    //     }).catch( error => {
    //       return error
    //     });
    var successFlag;
    // console.log('sendSuccessFlag', sendSuccessFlag, backSuccessFlag)
    axios.post(
      "https://formcarry.com/s/Ek8wZYC7v0H",
      this.state,
      {headers: {"Accept": "application/json"}}
    ).then(function (response) {
        let successMessage = document.querySelector('.success-message');
        // successMessage.innerHTML = JSON.stringify(response.data.title);
        successFlag=true;

        stateReset(successFlag)
        this.setState({
          successMessage: <FormattedMessage id= 'ContactDetailsForm.sendMessageSuccess' />
        });
    }).catch(function (error) {
        let errorMessage = document.querySelector('.error-message');
        // errorMessage.innerHTML = JSON.stringify(error);
        stateReset(false)

      });

    e.preventDefault();


    const stateReset = (sendSuccessFlag) => {
      this.setState({
        successFlag: sendSuccessFlag
      }) // <= here
    }

    this.setState({
      name: '',
      surname: '',
      email: '',
      phoneNumber:"",
      message: '',
    }) // <= here
  }
  handleFields = e => {

    this.setState({ [e.target.name]: e.target.value });
  }

  render() {

    const phonePlaceholder = "Enter your phone number";

    const phoneLabel = <FormattedMessage id='ContactDetailsForm.phoneLabel'/>;

    const phoneNumberRequiredMessage =
      <FormattedMessage id= 'ContactDetailsForm.phoneNumberRequired' />;

    const phoneNumberInvaildMessage =
      this.state.phoneNumber != '' && !isValidPhoneNumber(this.state.phoneNumber)?
      <FormattedMessage id='ContactDetailsForm.phoneNumberInvalid'/> : '';


    const phoneNumberErrorMessage =  this.state.phoneNumber != '' && !this.state.phoneNumber? phoneNumberRequiredMessage : phoneNumberInvaildMessage;

    let countryZipCode;

    if( this.state.phoneNumber && parsePhoneNumber(this.state.phoneNumber) ) {

      countryZipCode = parsePhoneNumber(this.state.phoneNumber).country

    } else {

      // const selectedLocation =  getSelectedLocation();

      // if ( selectedLocation &&
      //       selectedLocation.hasOwnProperty('address') &&
      //         typeof selectedLocation.address != 'undefined' ) {

      //   const temp = getCode('Taiwan');

      //   countryZipCode = typeof temp != 'undefined'?
      //       temp : typeof getLocationInfo('defaultLocation').address != 'undefined'?
      //         getCode(getLocationInfo('defaultLocation').address) : 'US';

      // }else{

      //   countryZipCode = 'US';

      // }
      countryZipCode = 'US';
    }

    const flagMessage = () => {
      if ( typeof this.state.successFlag == 'string'){

      }else {
        if( !this.state.successFlag ){
          return (
            <FormattedMessage id= 'ContactForm.sendMessageError' />
          )
        } else {
          return (
            <FormattedMessage id= 'ContactForm.sendMessageSuccess' />
          )
        }
      }
    }
    return (

      <form onSubmit={this.handleForm}>
        <label htmlFor="name">Name</label>
        <input required type="text" id="name" name="name" onChange={this.handleFields} value={this.state.name} />

        <label htmlFor="surname">Surname</label>
        <input required type="text" id="surname" name="surname" onChange={this.handleFields} value={this.state.surname} />

        <label htmlFor="email">Email</label>
        <input required type="email" id="email" name="email" onChange={this.handleFields} value={this.state.email} />

        <div style={{"marginTop":'15px'}} className={'FieldTextInput_root__30DVD'} >
          <label htmlFor='phoneNumber'>{phoneLabel}</label>
          <PhoneInput
            className={css.phoneNumber}
            id='phoneNumber'
            name="phoneNumber"
            flags={flags}
            placeholder={phonePlaceholder}
            country={countryZipCode}
            value={this.state.phoneNumber}
            onChange={(value) => {this.setState({phoneNumber:value})}}
          />
          <label className={css.phoneNumberErrorMessage}>
            { phoneNumberErrorMessage }
          </label>
        </div>

        <label htmlFor="message">Your Message</label>
        <textarea required name="message" id="message" onChange={this.handleFields} value={this.state.message}></textarea>

        <button id="how-button" type="submit">Send</button>

          <div className="flag-message">
            <label>
             {flagMessage()}
            </label>
          </div>

      </form>
    );
  }
}

export default ContactForm;





