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

const MainStack = (props) => {
  const LocateData = useRecoilValue(Locate);
  const [SearchData, setSearchData] = useRecoilState(Search);

  const Stack = createStackNavigator();

  const handleSearch = () => {
    setSearchData(!SearchData);
  };

  return (
    <Stack.Navigator locate={LocateData}>
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
    </Stack.Navigator>
  );
};

export default MainStack;
