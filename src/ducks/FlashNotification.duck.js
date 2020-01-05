/**
 * This file contains Action constants, Action creators, and reducer of global
 * FlashMessages. Global actions can be used in multiple pages.
 * We are following Ducks module proposition:
 * https://github.com/erikras/ducks-modular-redux
 */

import find from 'lodash/find';
import findIndex from 'lodash/findIndex';

// Actions: system notifications
export const ADD_FLASH_NOTIFICATION = 'app/FlashNotification/ADD_NOTIFICATION';
export const REMOVE_FLASH_NOTIFICATION = 'app/FlashNotification/REMOVE_NOTIFICATION';

const initialState = [];

  nextMessageId += 1;
  return {
    type: ADD_FLASH_NOTIFICATION,
    payload: { id: `note_${id}`, type, content, isRead: false },
  };
};

export const removeFlashNotification = id => ({ type: REMOVE_FLASH_NOTIFICATION, payload: { id } });
