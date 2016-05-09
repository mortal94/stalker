import {ROOM_SELECTED, ITEM_LOG_ADDED, INITIAL_DATA_LOADED} from '../constants/ActionTypes';

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
