import React, { useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
} from 'react-native';
import SafeScreen from './src/components/common/SafeScreen';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Router from './router';
import colors from './src/constants/colors';

function App(): React.JSX.Element {

  const now = new Date();
  // Set to the first day of the current month
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  // Get the first day of the next month, then subtract one millisecond to get the end of the current month
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  endOfMonth.setMilliseconds(endOfMonth.getMilliseconds() - 1);

  // Convert to Unix timestamps (seconds)
  const startOfMonthTimestamp = Math.floor(startOfMonth.getTime() / 1000);
  const endOfMonthTimestamp = Math.floor(endOfMonth.getTime() / 1000);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeScreen>
          <Router />
        </SafeScreen>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
