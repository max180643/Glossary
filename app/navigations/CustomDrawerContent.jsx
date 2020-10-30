import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Avatar, Text, Icon } from '@ui-kitten/components';
import AvatarImage from '../assets/klee.png';

const CustomDrawerContent = (props) => (
  <View style={{ flex: 1 }}>
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <View>
            <Avatar style={styles.avatar} source={AvatarImage} />
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
          <View style={{}}>
            <DrawerItemList {...props} />
            <View style={styles.bottomDrawerSection}>
              <DrawerItem
                label="Switch language"
                icon={({ color }) => (
                  <Icon
                    style={styles.icon}
                    fill={color}
                    name="globe-2"
                  />
                )}
              />
            </View>
          </View>
        </View>
      </View>
    </DrawerContentScrollView>
    <View style={styles.bottomDrawerSection}>
      <DrawerItem
        label="Sign Out"
        icon={({ color }) => (
          <Icon
            style={styles.icon}
            fill={color}
            name="log-out"
          />
        )}
      />
    </View>
  </View>
);

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
    marginTop: 5,
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
  icon: {
    height: 22,
    width: 22,
  },
});

export default CustomDrawerContent;
