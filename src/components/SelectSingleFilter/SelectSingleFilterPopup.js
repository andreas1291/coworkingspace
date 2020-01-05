import React, { Component } from 'react';
import { string, func, arrayOf, shape, number } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import { Menu, MenuContent, MenuItem, MenuLabel } from '..';
import css from './SelectSingleFilterPopup.css';

const optionLabel = (options, key) => {
  const option = options.find(o => o.key === key);
  return option ? option.label : key;
};

class SelectSingleFilterPopup extends Component {
  constructos = classNames(rootClassName || css.root, className);

    return (
      <Menu
        className={classes}
        useArrow={false}
        contentPlacementOffset={contentPlacementOffset}
        onToggleActive={this.onToggleActive}
        isOpen={this.state.isOpen}
      >
        <MenuLabel className={menuLabelClass}>{menuLabel}</MenuLabel>
        <MenuContent className={css.menuContent}>
          {options.map(option => {
            // check if this option is selected
            const selected = initialValue === option.key;
            // menu item border class
            const menuItemBorderClass = selected ? css.menuItemBorderSelected : css.menuItemBorder;

            return (
              <MenuItem key={option.key}>
                <button
                  className={css.menuItem}
                  onClick={() => this.selectOption(urlParam, option.key)}
                >
                  <span className={menuItemBorderClass} />
                  {option.label}
                </button>
              </MenuItem>
            );
          })}
          <MenuItem key={'clearLink'}>
            <button className={css.clearMenuItem} onClick={() => this.selectOption(urlParam, null)}>
              <FormattedMessage id={'SelectSingleFilter.popupClear'} />
            </button>
          </MenuItem>
        </MenuContent>
      </Menu>
    );
  }
}

SelectSingleFilterPopup.defaultProps = {
  rootClassName: null,
  className: null,
  initialValue: null,
  contentPlacementOffset: 0,
};

SelectSingleFilterPopup.propTypes = {
  rootClassName: string,
  className: string,
  urlParam: string.isRequired,
  label: string.isRequired,
  onSelect: func.isRequired,
  options: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ).isRequired,
  initialValue: string,
  contentPlacementOffset: number,
};

export default SelectSingleFilterPopup;
