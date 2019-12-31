import React, { Component } from 'react';
import { bool, func, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import { injectIntl, FormattedMessage } from 'react-intl';

import arrayMutators from 'final-form-arrays';
import { propTypes } from '../../util/types';
import { getTimeIndex, getNextStage, getHourVal } from '../../util/dates';
import { Form, Button, CategoryFieldEx, IconClose,FieldCheckbox } from '../../components';

import classNames from 'classnames';
import css from './EditListingInfoForm.css';
import plus from './plus.png'

export class EditListingInfoFormComponent extends Component {

  constructor(props) {
    super(props);
    const { timeSlot } = props.initialValues;
    // console.log('props.initialValues', props.initialValues)

    this.state = {
      timeSlot
    };
    this.twiceFalg = false
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.hideAddTimeSlot = this.hideAddTimeSlot.bind(this);
    this.showAddTimeSlot = this.showAddTimeSlot.bind(this);
    this.handleWeekDayChange = this.handleWeekDayChange.bind(this)
  }

  // In case start or end date for the booking is missing
  // focus on that input, otherwise continue with the
  // default handleSubmit function.
  handleSubmit() {
    // console.log('submit value', this.state)

    this.props.onSubmit({
      timeSlot:  this.state.timeSlot
    });
  }

  showAddTimeSlot(i) {

    const { hoursRange } = this.props;
    const currentItem = this.state.timeSlot[i]
    const currentEndTime = currentItem.timeSlot.endTime;
    const currentEndTimeIndex = getTimeIndex(hoursRange, currentEndTime);
    // console.log('currentEndTimeIndex', currentEndTimeIndex)
    if (currentEndTimeIndex > 0 && currentEndTimeIndex < hoursRange.length - 1) {

      const updatedItem = {
        ...currentItem,
        timeSlot:  {
          ...currentItem.timeSlot,
          showAdditionalTimeSlot: true,
          startTimeTemp: hoursRange[currentEndTimeIndex].label,
          endTimeTemp: hoursRange[currentEndTimeIndex + 1].label,
          startHourCategoryTemp: hoursRange.slice(currentEndTimeIndex),
          endHourCategoryTemp: hoursRange.slice(currentEndTimeIndex + 1),
        }
      }

      const updatedTimeSlot = this.state.timeSlot.map((item, index) => {
        return index === i?updatedItem:item
      })

      this.setState({
        timeSlot: updatedTimeSlot
      })
    }
  }

  hideAddTimeSlot(i) {

    const currentItem = this.state.timeSlot[i]

    const updatedItem = {
      ...currentItem,
      timeSlot: {
        ...currentItem.timeSlot,
        showAdditionalTimeSlot: false,
        startTimeTemp: null,
        endTimeTemp: null,
        startHourCategoryTemp: [],
        endHourCategoryTemp: [],
      }
    }

    const updatedTimeSlot = this.state.timeSlot.map((item, index) => {
      return index === i?updatedItem:item
    })

    this.setState({
      timeSlot: updatedTimeSlot
    })

  }

  handleWeekDayChange(i){

    if ( this.twiceFalg ) {
      this.twiceFalg = !this.twiceFalg
      return
    }
    // console.log('handleWeekDayChange', i, this.twiceFalg)
    const updatedTimeSlot = this.state.timeSlot.map((item, index) => {
      const updatedItem = { ...item, value:!item.value }
      return index === i?updatedItem:item
    })

    this.setState({
      timeSlot: updatedTimeSlot
    })
  }

  handleChange(e) {

    const { timeSlot } = e.values
    const activeValue = e.values[e.active]
    const hoursRange = this.props.hoursRange;

    if (   e.active
        &&(e.active.includes('startTime')
        || e.active.includes('endTime')
        || e.active.includes('startTimeTemp')
        || e.active.includes('endTimeTemp'))
        && activeValue ) {

        const weekDayName = e.active.split('-')[0]
        const itemIndex = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].lastIndexOf(weekDayName)
        const currentItem = this.state.timeSlot[itemIndex]
        const {
          showAdditionalTimeSlot: currentShowAdditionalTimeSlot
        } = currentItem.timeSlot

        // console.log('currentShowAdditionalTimeSlot',timeSlot[itemIndex],weekDayName,itemIndex, currentShowAdditionalTimeSlot)


        let clue = currentItem.timeSlot

        if (e.active.includes('startTime')) {
          clue.startTime = e.values[`${weekDayName}-startTime`]
        }
        if (e.active.includes('endTime')) {
          clue.endTime = e.values[`${weekDayName}-endTime`]
        }
        if (e.active.includes('startTimeTemp')) {
          clue.startTimeTemp = e.values[`${weekDayName}-startTimeTemp`]
        }
        if (e.active.includes('endTimeTemp')) {
          clue.endTimeTemp = e.values[`${weekDayName}-endTimeTemp`]
        }

        const {
          hoursRange: newStartHourCategory,
          currentTime: newStartTime
        } = getNextStage(hoursRange, null, clue.startTime, true);

        const {
          hoursRange: newEndHourCategory,
          currentTime: newEndTime
        } = getNextStage(hoursRange, newStartTime, clue.endTime, false);

        const {
          hoursRange: newStartHourTempCategory,
          currentTime: newStartTimeTemp
        } = getNextStage(hoursRange, newEndTime, clue.startTimeTemp, true);

        const {
          hoursRange: newEndHourTempCategory,
          currentTime: newEndTimeTemp
        } = getNextStage(hoursRange, newStartTimeTemp, clue.endTimeTemp, false);

        const showAdditionalTimeSlotFlag = newStartTime && newEndTime && newStartTimeTemp && newEndTimeTemp;



        const updatedItem = {
          ...currentItem,
          timeSlot: {
            startTime: newStartTime,
            endTime: newEndTime,
            startTimeTemp: newStartTimeTemp,
            endTimeTemp: newEndTimeTemp,
            startHourCategory: newStartHourCategory,
            endHourCategory: newEndHourCategory,
            startHourCategoryTemp: newStartHourTempCategory,
            endHourCategoryTemp: newEndHourTempCategory,
            showAdditionalTimeSlot: showAdditionalTimeSlotFlag? currentShowAdditionalTimeSlot : false,
          }
        }

        const updatedTimeSlot = this.state.timeSlot.map((item, index) => {
          return index === itemIndex?updatedItem:item
        })

        this.setState({
          timeSlot: updatedTimeSlot
        })
      } else {
        // const newTimeSlot = timeSlot.map((item, index) => {
        //   const {
        //     startTime,
        //     endTime,
        //     startTimeTemp,
        //     endTimeTemp,
        //     showAdditionalTimeSlot: currentShowAdditionalTimeSlot
        //    } = item.timeSlot

        //   const {
        //     hoursRange: newStartHourCategory,
        //     currentTime: newStartTime
        //   } = getNextStage(hoursRange, null, startTime, true);

        //   const {
        //     hoursRange: newEndHourCategory,
        //     currentTime: newEndTime
        //   } = getNextStage(hoursRange, newStartTime, endTime, false);

        //   const {
        //     hoursRange: newStartHourTempCategory,
        //     currentTime: newStartTimeTemp
        //   } = getNextStage(hoursRange, newEndTime, startTimeTemp, true);

        //   const {
        //     hoursRange: newEndHourTempCategory,
        //     currentTime: newEndTimeTemp
        //   } = getNextStage(hoursRange, newStartTimeTemp, endTimeTemp, false);

        //   const showAdditionalTimeSlotFlag = newStartTime && newEndTime && newStartTimeTemp && newEndTimeTemp;


        //   const updatedItem = {
        //     ...item,
        //     timeSlot: {
        //       startTime: newStartTime,
        //       endTime: newEndTime,
        //       startTimeTemp: newStartTimeTemp,
        //       endTimeTemp: newEndTimeTemp,
        //       startHourCategory: newStartHourCategory,
        //       endHourCategory: newEndHourCategory,
        //       startHourCategoryTemp: newStartHourTempCategory,
        //       endHourCategoryTemp: newEndHourTempCategory,
        //       showAdditionalTimeSlot: showAdditionalTimeSlotFlag? currentShowAdditionalTimeSlot : false,
        //     }
        //   }

        //   return updatedItem
        // })
        // console.log('handleChange',newTimeSlot)
        // this.setState({
        //   timeSlot: newTimeSlot
        // })
      }
  }
  render() {
    const {
      className,
      rootClassName,
      listingId,
      availability,
      availabilityPlan,
      urgentInfoCategory,
      ...rest
    } = this.props;
    return (
      <FinalForm
        {...rest}
        mutators={{ ...arrayMutators }}
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
        render={formRenderProps => {
          const {
            className,
            rootClassName,
            values,
            disabled,
            handleSubmit,
            onChange,
            invalid,
            pristine,
            saveActionMsg,
            updated,
            updateError,
            updateInProgress,
          } = formRenderProps;

          const errorMessage = updateError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingInfoForm.updateFailed" />
            </p>
          ) : null;

          const classes = classNames(rootClassName || css.root, className);
          const submitReady = updated && pristine;
          const submitInProgress = updateInProgress;
          const submitDisabled = invalid || disabled || submitInProgress || this.state.isSubmitDisable;
          // console.log('this.state.timeSlot', this.state.timeSlot)
          return (
            <Form
              className={classes}
              onSubmit={e => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <FormSpy onChange={onChange} />
              {errorMessage}
              <div className={css.calendarWrapper}>
                <div className={css.timeRange}>
                  <div className={css.contentWrapper}>
                    <span className={css.label}>
                      <FormattedMessage id="EditListingInfoForm.TimeRange.label" />
                    </span>
                    {
                      this.state.timeSlot.map((item, index) => {
                        return (
                          <div className={css.oneDayTimeSlot} key={index}>
                            <div className={css.inputsWrapperEx}>

                              <FieldCheckbox
                                id={`weekdayValue-${index}`}
                                name="weekdayValue"
                                label=""
                                onChange={() => {this.handleWeekDayChange(index)}}
                                checked={item.value}
                                value={item.key}
                              />
                              <label className={css.weekday}>{item.key}</label>
                              <CategoryFieldEx
                                id={`weekdayValue-startTime-${index}`}
                                name={`${item.key}-startTime`}
                                // className={classNames(css.startTime, !item.value ? css.disabled : '')}
                                categories={item.timeSlot.startHourCategory}
                                // categoryLabel={startTimeCategoryLabel}
                                // defaultValue={item.timeSlot.startTime}
                                disabled={ !item.value ? 'disabled' : false}
                              />
                              <span className={css.seperator}> - </span>
                              <CategoryFieldEx
                                id={`weekdayValue-endTime-${index}`}
                                name={`${item.key}-endTime`}
                                // className={css.disabled}
                                categories={item.timeSlot.endHourCategory}
                                // categoryLabel={endTimeCategoryLabel}
                                // defaultValue={item.timeSlot.endTime}
                                disabled={ !item.value ? 'disabled' : false}
                              />
                            </div>
                            <div className={css.inputsWrapperEx}>
                            {
                              item.timeSlot.showAdditionalTimeSlot ? (
                                <React.Fragment>
                                  <CategoryFieldEx
                                    id={`weekdayValue-startTimeTemp-${index}`}
                                    name={`${item.key}-startTimeTemp`}
                                    // className={classNames(css.startTime, !item.value ? css.disabled : '')}
                                    categories={item.timeSlot.startHourCategoryTemp}
                                    // categoryLabel={startTimeCategoryLabel}
                                    // initialValue={item.timeSlot.startTimeTemp}
                                    disabled={ !item.value ? 'disabled' : false}
                                  />
                                  <span className={css.seperator}> - </span>
                                  <CategoryFieldEx
                                    id={`weekdayValue-endTimeTemp-${index}`}
                                    name={`${item.key}-endTimeTemp`}
                                    // className={classNames(css.endTime, !item.value ? css.disabled : '')}
                                    categories={item.timeSlot.endHourCategoryTemp}
                                    // categoryLabel={endTimeCategoryLabel}
                                    // initialValue={item.timeSlot.endTimeTemp}
                                    disabled={ !item.value ? 'disabled' : false}
                                  />
                                  <Button
                                    rootClassName={classNames(css.close, css.closeLight, !item.value ? css.disabled : '')}
                                    disabled={ !item.value}
                                    onClick={() => {
                                      if (item.value) {
                                        this.hideAddTimeSlot(index)
                                      }
                                    }}
                                  >
                                    <IconClose rootClassName={css.closeIcon} />
                                  </Button>
                                </React.Fragment>
                              ) : (
                                    <span
                                      disabled={ !item.value}
                                      onClick={() => {
                                        if (item.value) {
                                          this.showAddTimeSlot(index)
                                        }
                                      }}
                                    >
                                      <img className={classNames(css.addTimeSlot, !item.value ? css.disabled : '')} src={plus} />
                                    </span>
                                )
                              }
                              </div>
                          </div>
                        )
                      })
                    }
                    </div>
                  </div>
                <Button
                  className={css.submitButton}
                  type="submit"
                  inProgress={submitInProgress}
                  disabled={submitDisabled}
                  ready={submitReady}
                >
                  {saveActionMsg}
                </Button>
              </div>
            </Form>
          );
        }}
      />
    );
  }
}

EditListingInfoFormComponent.defaultProps = {
  updateError: null,
};

EditListingInfoFormComponent.propTypes = {
  //intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  updateError: propTypes.error,
  updateInProgress: bool.isRequired,
};

export default compose(injectIntl)(EditListingInfoFormComponent);
