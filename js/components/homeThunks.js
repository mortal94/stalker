import {initialDataLoaded, itemsAreSuspicious} from '../actions/HomeActions'
const request = require('superagent');

export function requestInitialData() {
  return dispatch => {
    request.get('https://redstalker.firebaseio.com/.json', (err, res) => {
      dispatch(initialDataLoaded(res.body));
    });
  };
}

const violationInMilliseconds = 2000;
export function watchTravelingItems() {
  return (dispatch, getState) => {
    let currentTime = 0;
    setInterval(() => {
      const state = getState();
      const suspiciousItems = state.Home.items.filter(item => (item.lastUpdated - violationInMilliseconds) > currentTime);
      dispatch(itemsAreSuspicious(suspiciousItems));
    }, 1000);
  };
}
