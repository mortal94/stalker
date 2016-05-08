import React from 'react';
import {__DEV__} from '../config'

export function renderDevTools(store) {
  if (__DEV__) {
    let {DevTools, DebugPanel, LogMonitor} = require('redux-devtools/lib/react');
    return (
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    );
  }

  return null;
}
