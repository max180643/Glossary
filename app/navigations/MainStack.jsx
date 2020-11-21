import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useRecoilValue } from 'recoil';
import { Locate } from '../states/atom';
import CustomHeaderButton from '../components/navigations/CustomHeaderButton';
import i18n from '../lang/i18n';

// screens
import Home from '../screens/Home';

const MainStack = (props) => {
  const LocateData = useRecoilValue(Locate);

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator locate={LocateData}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: i18n.t('Home.Title'),
          headerStyle: { backgroundColor: 'skyblue' },
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
};

export default MainStack;
