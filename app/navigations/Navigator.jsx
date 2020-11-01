import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useRecoilState } from 'recoil';
import { locate } from '../states/atom';
import CustomDrawerContent from './CustomDrawerContent';
import MainStack from './MainStack';
import CustomEvaIcon from '../components/CustomEvaIcon';
import i18n from '../lang/i18n';

const Navigator = () => {
  const Drawer = createDrawerNavigator();

  const [locateData, setLocateData] = useRecoilState(locate);

  const SwitchLanguage = () => {
    const locateCode = locateData.split('-')[0];
    if (locateCode === 'th') {
      setLocateData('en-US');
      i18n.locale = 'en-US';
    } else {
      setLocateData('th-TH');
      i18n.locale = 'th-TH';
    }
  };

  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent {...props} SwitchLanguage={SwitchLanguage} />}>
      <Drawer.Screen name="Home" component={MainStack} options={{ title: i18n.t('Navigation.Home'), drawerIcon: (props) => (<CustomEvaIcon data={{ ...props, name: 'home' }} />) }} />
      <Drawer.Screen name="MyGlossary" component={MainStack} options={{ title: i18n.t('Navigation.MyGlossary'), drawerIcon: (props) => (<CustomEvaIcon data={{ ...props, name: 'book' }} />) }} />
      <Drawer.Screen name="CreateNewGlossary" component={MainStack} options={{ title: i18n.t('Navigation.CreateNewGlossary'), drawerIcon: (props) => (<CustomEvaIcon data={{ ...props, name: 'plus-square' }} />) }} />
    </Drawer.Navigator>
  );
};

export default Navigator;
