import {ROOM_SELECTED} from '../constants/ActionTypes';

export function selectRoom(roomId) {
  return {
    type: ROOM_SELECTED,
    roomId
  };
}
