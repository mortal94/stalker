import React from 'react';
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore';
import Home from '../components/Home';
import {renderDevTools} from '../utils/devTools';
import {addItemLog} from '../actions/HomeActions';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
var Firebase = require("firebase");

const store = configureStore();

const itemLogRef = new Firebase('https://redstalker.firebaseio.com/itemLog');
itemLogRef.on("child_added", function(snapshot, prevChildKey) {
  var logItem = snapshot.val();
  store.dispatch(addItemLog({
    ...logItem,
    addedOn: new Date().getTime()
  }));
});

const styles = {
  app: {
  }
};

export default React.createClass({
  render() {
    return (
      <div style={styles.app}>

        {/* <Home /> is your app entry point */}
        <Provider store={store}>
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Home />
          </MuiThemeProvider>
        </Provider>

        {/* only renders when running in DEV mode */
          renderDevTools(store)
        }
      </div>
    );
  }
});
