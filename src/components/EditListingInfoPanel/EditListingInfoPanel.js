import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import {
  checkTimes,
  getHoursRange,
  getHourVal,
  getTimeIndex,
} from '../../util//dates';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ensureListing } from '../../util/data';
import { EditListingInfoForm } from '../../forms';
import { ListingLink } from '../../components';
import config from '../../config';
import css from './EditListingInfoPanel.css';

const getHourCategory = (hoursRange, startTime, endTime, startTimeTemp) => {
  const currentStartTimeIndex = getTimeIndex(hoursRange, startTime);
  const currentEndTimeIndex = getTimeIndex(hoursRange, endTime);

  const startHourCategory = hoursRange;
  const endHourCategory = hoursRange.slice(currentStartTimeIndex + 1);
  const startHourCategoryTemp = startTimeTemp ? hoursRange.slice(currentEndTimeIndex) : [];
  const endHourCategoryTemp = startTimeTemp ? hoursRange.slice(currentEndTimeIndex + 1) : [];

  return {
    startHourCategory,
    endHourCategory,
    startHourCategoryTemp,
    endHourCategoryTemp
  }
}

const getInitialValues = (timeSlot) => {
  let initialValue = {}
  timeSlot.forEach((item, index) => {
    const { startTimeTemp, endTimeTemp, startTime, endTime } = item.timeSlot
    initialValue[`${item.key}-startTime`] = startTime
    initialValue[`${item.key}-endTime`] = endTime
    initialValue[`${item.key}-startTimeTemp`] = startTimeTemp
    initialValue[`${item.key}-endTimeTemp`] = endTimeTemp
  })

  return initialValue
}
const getEmptyValues = (hoursRange, startTime = '00:00', endTime = '22:30', startTimeTemp = null, endTimeTemp = null) => {

  checkTimes({
    startTime: startTime,
    endTime: endTime,
  });

  if (startTimeTemp && endTimeTemp) {
    checkTimes({
      startTime: startTimeTemp,
      endTime: endTimeTemp,
    });
  }

  const {
    startHourCategory,
    endHourCategory,
    startHourCategoryTemp,
    endHourCategoryTemp
  } = getHourCategory(hoursRange, startTime, endTime, startTimeTemp)

  const showAdditionalTimeSlot = startTimeTemp
    && endTimeTemp
    && getHourVal(endTime) <= getHourVal(startTimeTemp) ? true : false;

  const timeSlot = {
    startTime,
    endTime,
    startTimeTemp,
    endTimeTemp,
    startHourCategory,
    endHourCategory,
    startHourCategoryTemp,
    endHourCategoryTemp,
    showAdditionalTimeSlot
  }

  return [
    { key: 'mon', value: true, timeSlot },
    { key: 'tue', value: true, timeSlot },
    { key: 'wed', value: true, timeSlot },
    { key: 'thu', value: true, timeSlot },
    { key: 'fri', value: true, timeSlot },
    { key: 'sat', value: true, timeSlot },
    { key: 'sun', value: true, timeSlot }
  ]
}

const getUpdatedPlan= ( timeSlot ) => {
  const newAvailabilityPlan = timeSlot.map((item, index) => {
    return { dayOfWeek: item.key, seats: item.value?1:0 }
  })
  return newAvailabilityPlan
}
const EditListingInfoPanel = props => {
  const {
    rootClassName,
    className,
    listing,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureListing(listing);
  const { publicData } = currentListing.attributes;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;


  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingInfoPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingInfoPanel.createListingTitle" />
  );


  // Time picker initial values
  const configStartTime = config.custom.timePickerConfig.startTime;
  const configEndTime = config.custom.timePickerConfig.endTime;
  const configRestStartTime = config.custom.timePickerConfig.restStartTime;
  const configRestEndTime = config.custom.timePickerConfig.restEndTime;
  const configMarginStartTime = config.custom.timePickerConfig.marginStartTime;
  const configMarginEndTime = config.custom.timePickerConfig.marginEndTime;

  const restTimes = {
    restStartTime: configRestStartTime,
    restEndTime: configRestEndTime,
  }
  const marginTimes = {
    marginStartTime: configMarginStartTime,
    marginEndTime: configMarginEndTime,
  }

  checkTimes({
    startTime: restTimes.restStartTime,
    endTime: restTimes.restEndTime,
  });
  checkTimes({
    startTime: marginTimes.marginStartTime,
    endTime: marginTimes.marginEndTime,
  });

  const hoursRange = getHoursRange(marginTimes, restTimes);
  const timeSlot = publicData && publicData.timeSlot ? publicData.timeSlot : getEmptyValues( hoursRange, configStartTime, configEndTime );
  // console.log('timeSlot', timeSlot)
  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingInfoForm
        className={css.form}
        listingId={currentListing.id}
        publicData={publicData}
        hoursRange={hoursRange}
        initialValues={{
          timeSlot,
          ...getInitialValues(timeSlot)
        }}
        onSubmit={(value) => {
          const { timeSlot } = value;
          const { availabilityPlan, } = getUpdatedPlan(timeSlot)
          onSubmit({
            availabilityPlan,
            publicData: {
              timeSlot
            },
          });
        }}
        onChange={onChange}
        saveActionMsg={submitButtonText}
        updated={panelUpdated}
        updateError={errors.updateListingError}
        updateInProgress={updateInProgress}
      />
    </div>
  );
};

EditListingInfoPanel.defaultProps = {
  rootClassName: null,
  className: null,
  listing: null,
};

const { bool, func, object, string } = PropTypes;

EditListingInfoPanel.propTypes = {
  rootClassName: string,
  className: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingInfoPanel;
