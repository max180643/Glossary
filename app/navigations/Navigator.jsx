import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import MainStack from './MainStack';
import CustomEvaIcon from '../components/CustomEvaIcon';

const Navigator = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={MainStack} options={{ title: 'Home', drawerIcon: (props) => (<CustomEvaIcon data={{ ...props, name: 'home' }} />) }} />
      <Drawer.Screen name="MyGlossary" component={MainStack} options={{ title: 'My Glossary', drawerIcon: (props) => (<CustomEvaIcon data={{ ...props, name: 'book' }} />) }} />
      <Drawer.Screen name="CreateNewGlossary" component={MainStack} options={{ title: 'Create new Glossary', drawerIcon: (props) => (<CustomEvaIcon data={{ ...props, name: 'plus-square' }} />) }} />
    </Drawer.Navigator>
  );
};

export default Navigator;
