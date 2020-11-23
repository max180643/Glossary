import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Locate, Search } from '../states/atom';
import CustomHeaderButton from '../components/navigations/CustomHeaderButton';
import i18n from '../lang/i18n';
import colors from '../constants/colors';

// screens
import Home from '../screens/Home';
import Detail from '../screens/Detail';
import Game from '../screens/Game';

const MainStack = (props) => {
  const LocateData = useRecoilValue(Locate);
  const [SearchData, setSearchData] = useRecoilState(Search);

  const Stack = createStackNavigator();

  const handleSearch = () => {
    setSearchData(!SearchData);
  };

  return (
    <Stack.Navigator locate={LocateData} initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: i18n.t('Home.Title'),
          headerStyle: { backgroundColor: colors.primary },
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Menu"
                iconName="ios-menu"
                onPress={() => props.navigation.toggleDrawer()}
              />
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Search"
                iconName="ios-search"
                onPress={() => handleSearch()}
              />
            </HeaderButtons>
          ),
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          title: 'Detail',
          headerStyle: { backgroundColor: colors.primary },
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Menu"
                iconName="ios-arrow-back"
                onPress={() => props.navigation.goBack()}
              />
            </HeaderButtons>
          ),
        }}
      />
      <Stack.Screen
        name="Game"
        component={Game}
        options={{
          title: 'Game',
          headerStyle: { backgroundColor: colors.primary },
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Menu"
                iconName="ios-arrow-back"
                onPress={() => props.navigation.goBack()}
              />
            </HeaderButtons>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
