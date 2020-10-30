import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList,
} from '@react-navigation/drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {
  Avatar,
  Text,
  Button,
} from '@ui-kitten/components';
import CustomHeaderButton from '../components/CustomHeaderButton';

// screens
import Home from '../screens/Home';

const Navigator = () => {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  const MainStack = (props) => (
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

  const CustomDrawerContent = (props) => (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View>
              <Avatar style={styles.avatar} source={require('../assets/klee.png')} />
            </View>
            <View style={styles.name}>
              <Text category="h3">Klee</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={styles.total}>
                <Text category="h6">Total</Text>
                <Text category="s1">5</Text>
              </View>
              <View style={styles.like}>
                <Text category="h6">Like</Text>
                <Text category="s1">5</Text>
              </View>
            </View>
          </View>
          <View style={styles.drawerSection}>
            <View style={styles.bottomDrawerSection}>
              <DrawerItemList {...props} />
            </View>
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          label="Sign Out"
        />
      </View>
    </View>
  );

  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home1" component={MainStack} />
      <Drawer.Screen name="Home2" component={MainStack} />
    </Drawer.Navigator>
  );
};

export default Navigator;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'skyblue',
  },
  name: {
    marginTop: 10,
    fontWeight: '400',
  },
  total: {
    lineHeight: 14,
    padding: 10,
    alignItems: 'center',
    marginRight: 30,
  },
  like: {
    lineHeight: 14,
    padding: 10,
    alignItems: 'center',
    marginLeft: 30,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  avatar: {
    height: 128,
    width: 128,
  },
});
