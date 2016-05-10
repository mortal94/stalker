import {initialDataLoaded, itemsAreSuspicious} from '../actions/HomeActions'
const request = require('superagent');

export function requestInitialData() {
  return dispatch => {
    request.get('https://redstalker.firebaseio.com/.json', (err, res) => {
      dispatch(initialDataLoaded(res.body));
    });
  };
}

const violationInMilliseconds = 10000;
export function watchTravelingItems() {
  return (dispatch, getState) => {
    setInterval(() => {
      const state = getState();
      let currentTime = new Date().getTime();
      const suspiciousItems = state.Home.items
        .filter(item => item.roomId === "-1" &&
                        (currentTime - item.lastUpdated) > violationInMilliseconds);

      if (suspiciousItems) {
        dispatch(itemsAreSuspicious(suspiciousItems));
      }
    }, 1000);
  };
}
