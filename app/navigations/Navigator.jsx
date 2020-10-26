import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
// screens
import Home from '../screens/Home';

const Navigator = () => {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  const mainStack = (props) => (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Menu"
                iconName="ios-menu"
                onPress={() => props.navigation.toggleDrawer()}
              />
            </HeaderButtons>
          ),
        }}
      />
    </Stack.Navigator>
  );

  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={mainStack} />
    </Drawer.Navigator>
  );
};

export default Navigator;
