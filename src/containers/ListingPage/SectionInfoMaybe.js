import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';

import css from './ListingPage.css';

const TimeRange = props => {
  const { startTime, endTime } = props
  return startTime?(
    <div className={css.timeRange}>
      <span className={css.unitTime}>{`From ${startTime}`}</span>
      <span>{`To ${endTime}`}</span>
    </div>
  ):null
}
const SectionInfoMaybe = props => {
  const { info: { timeSlot } } = props;
  return  (
    <div className={css.sectionDescription}>
      <h2 className={css.descriptionTitle}>
        <FormattedMessage id="ListingPage.infoTitle" />
      </h2>
      {
        timeSlot.map((item, index) => {
          const { startTime, endTime, startTimeTemp, endTimeTemp, showAdditionalTimeSlot } = item.timeSlot
          return item.value?(
            <div className={css.infoBoard}>
              <label className={css.weekday}>{item.key}</label>
              <TimeRange startTime={startTime} endTime={endTime} />
              {
                showAdditionalTimeSlot?(
                  <TimeRange startTime={startTimeTemp} endTime={endTimeTemp} />
                ):null
              }

            </div>
          ):null
        })
      }

    </div>
  );
};

export default SectionInfoMaybe;
