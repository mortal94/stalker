import * as ActionTypes from '../constants/ActionTypes';

let defaultState = {
  makmar: {
    rooms: [
      {
        id: 1,
        name: "Room 1",
        items: [],
        locationOnMap: {
          x: 100,
          y: 100
        }
      }
    ]
  }
};

export default function(state = defaultState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
