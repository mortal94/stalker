import * as ActionTypes from '../constants/ActionTypes';
var R = require('ramda');

let defaultState = {
  rooms: [],
  items: [],
  roomsFilter: null
};

const updateItemRoom = (items, itemId, roomId) => {
  const indexByRoomId = R.findIndex(R.propEq('id', itemId));
  const itemIndex = indexByRoomId(items);

  if (itemIndex === -1) {
    return items;
  }

  return R.update(itemIndex, {
    ...items[itemIndex],
    roomId: roomId
  }, items)
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.ROOM_SELECTED:
      return {
        ...state,
        roomsFilter: action.roomId
      };
    case ActionTypes.ITEM_LOG_ADDED:
      return {
        ...state,
        items: updateItemRoom(state.items, action.payload.itemId, action.payload.roomId)
      };
    case ActionTypes.INITIAL_DATA_LOADED:
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
}
