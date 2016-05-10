import * as ActionTypes from '../constants/ActionTypes';
var R = require('ramda');

let defaultState = {
  rooms: [],
  items: [],
  roomsFilter: null
};

const updateItemRoom = (items, itemId, roomId, addedOn) => {
  const indexByRoomId = R.findIndex(R.propEq('id', itemId));
  const itemIndex = indexByRoomId(items);

  if (itemIndex === -1) {
    return items;
  }

  return R.update(itemIndex, {
    ...items[itemIndex],
    roomId: roomId,
    lastUpdated: addedOn
  }, items)
};

const updateSuspiciousItems = (items, suspiciousItems) => {
  const suspiciousIds = suspiciousItems.map(R.prop('id'));
  return items.map(item => {
    if (R.contains(item.id, suspiciousIds)) {
      return {
        ...item,
        suspicious: true
      };
    }

    return {
      ...item,
      suspicious: false
    };
  });
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
        items: updateItemRoom(state.items, action.payload.itemId, action.payload.roomId, action.payload.addedOn)
      };
    case ActionTypes.INITIAL_DATA_LOADED:
      return {
        ...state,
        ...action.data
      };
    case ActionTypes.CLEAR_ROOMS_FILTER:
      return {
        ...state,
        roomsFilter: null
      };
    case ActionTypes.ITEMS_ARE_SUSPICIOUS:
      return {
        ...state,
        items: updateSuspiciousItems(state.items, action.items)
      };
    default:
      return state;
  }
}
