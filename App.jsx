import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { RecoilRoot } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

import Navigator from './app/navigations/Navigator';

export default function App() {
  return (
    <RecoilRoot>
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </ApplicationProvider>
    </RecoilRoot>
  );
}
