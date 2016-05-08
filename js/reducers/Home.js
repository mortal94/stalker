import * as ActionTypes from '../constants/ActionTypes';
const ItemType = {
  HDD: 1,
  DOC: 2
};
let defaultState = {
  makmar: {
    rooms: [
      {
        id: 1,
        name: "Room 1",
        locationOnMap: {
          x: 500,
          y: 70
        },
        size: {
          x: 50,
          y: 30
        }
      },
      {
        id: 2,
        name: "Room 2",
        locationOnMap: {
          x: 400,
          y: 70
        },
        size: {
          x: 50,
          y: 30
        }
      },
      {
        id: 3,
        name: "Room 3",
        locationOnMap: {
          x: 300,
          y: 70
        },
        size: {
          x: 50,
          y: 30
        }
      }
    ],
    items: [
      {
        id: 1,
        name: 'WS000000ONIX01',
        owner: 'Mor Tal',
        roomId: 1,
        type: ItemType.HDD
      },
      {
        id: 2,
        name: 'WS000000ONIX02',
        owner: 'Aviram Kofman',
        roomId: 1,
        type: ItemType.HDD
      },
      {
        id: 3,
        name: 'WS000000ONIX03',
        owner: 'Nadav Kaner',
        roomId: 2,
        type: ItemType.HDD
      },
      {
        id: 4,
        name: 'WS000000ONIX04',
        owner: 'Bar Miliavsky',
        roomId: 3,
        type: ItemType.HDD
      }
    ]
  },
  roomsFilter: null
};

export default function (state = defaultState, action) {
  console.log(state);
  switch (action.type) {
    case ActionTypes.ROOM_SELECTED:
      return  {
        ...state,
        roomsFilter: action.roomId
    };
    default:
      return state;
  }
}
