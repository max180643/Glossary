import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { RecoilRoot } from 'recoil';

// screens
import Home from './app/screens/Home';

export default function App() {
  return (
    <RecoilRoot>
      <ApplicationProvider {...eva} theme={eva.light}>
        <Home />
      </ApplicationProvider>
    </RecoilRoot>
  );
}
