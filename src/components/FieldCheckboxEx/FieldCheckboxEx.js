import React from 'react';
import { node, string } from 'prop-types';
import classNames from 'classnames';
import { Field } from 'react-final-form';

import css from './FieldCheckboxEx.css';


const FieldCheckboxExComponent = props => {
  const { rootClassName, className, id, label, ...rest } = props;

  const classes = classNames(rootClassName || css.root, className);
  const checkboxProps = {
    id,
    className: css.input,
    component: 'input',
    type: 'checkbox',
    ...rest,
  };


  return (
    <span
      className={classes}
    >
      {/* <Field {...checkboxProps} /> */}
      <label className={css.label}>
        <span className={css.text}>{label}</span>
      </label>
    </span>
  );
};

FieldCheckboxExComponent.defaultProps = {
  className: null,
  rootClassName: null,
  label: null,
};

FieldCheckboxExComponent.propTypes = {
  className: string,
  rootClassName: string,

  // Id is needed to connect the label with input.
  label: node,

  // Name groups several checkboxes to an array of selected values
  name: string.isRequired,

  // Checkbox needs a value that is passed forward when user checks the checkbox
  value: string.isRequired,
};

export default FieldCheckboxExComponent;
