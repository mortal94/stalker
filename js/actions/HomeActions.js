import {ROOM_SELECTED, ITEM_LOG_ADDED, INITIAL_DATA_LOADED, CLEAR_ROOMS_FILTER} from '../constants/ActionTypes';

export function selectRoom(roomId) {
  return {
    type: ROOM_SELECTED,
    roomId
  };
}

export function addItemLog(itemLog) {
  return {
    type: ITEM_LOG_ADDED,
    payload: itemLog
  }
}

export function initialDataLoaded(data) {
  return {
    type: INITIAL_DATA_LOADED,
    data
  }
}

export function clearRoomsFilter() {
  return {
    type: CLEAR_ROOMS_FILTER
  }
}
