import {initialDataLoaded} from '../actions/HomeActions'
const request = require('superagent');

export function requestInitialData(dispatch) {
  request.get('https://redstalker.firebaseio.com/.json', (err, res) => {
    dispatch(initialDataLoaded(res.body));
  });
}
