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
                      typeof ul == "array"?(
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
