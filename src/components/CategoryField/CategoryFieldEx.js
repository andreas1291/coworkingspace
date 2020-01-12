import React from 'react';
import { FieldSelect } from '..';
import css from './CategoryFieldEx.css';
import classNames from 'classnames';
const CategoryFieldEx = props => {
  const { name, id, categories, className, categoryLabel, initialValue, disabled, defaultValue, ...rest} = props;

  return categories ? (
    // <div className={css.CategoryFieldEx}>
    //   <span className={css.categoryLabel}>{categoryLabel}</span>
      <FieldSelect
        className={classNames( css.root, disabled?css.disabled:'')}
        name={name}
        id={id}
        disabled={disabled}
        {...rest}
      >
        {categories.map(c => {
         if(defaultValue === c.key){
          // console.log('defaultValue === c.key', defaultValue, c.key)
         }
          return(
            <option key={c.key} value={c.key} >
              {c.label}
            </option>
          )
        })}
      </FieldSelect>
    // </div>
  ) : null;
};

export default CategoryFieldEx;
