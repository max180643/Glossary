import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useRecoilValue } from 'recoil';
import { Locate } from '../states/atom';
import CustomHeaderButton from '../components/navigations/CustomHeaderButton';
import i18n from '../lang/i18n';
import colors from '../constants/colors';

// screens
import MyVocab from '../screens/MyVocab';

const MyVocabStack = (props) => {
  const LocateData = useRecoilValue(Locate);

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator locate={LocateData}>
      <Stack.Screen
        name="MyVocab"
        component={MyVocab}
        options={{
          title: 'My Vocab',
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
        }}
      />
    </Stack.Navigator>
  );
};

export default MyVocabStack;
