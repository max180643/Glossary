import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Avatar, Text, Icon } from '@ui-kitten/components';
import { useRecoilValue } from 'recoil';
import { IsLogin, UserName, UserPicture } from '../states/auth';
import ProfileImage from '../assets/profile.png';
import LoginButton from '../components/navigations/LoginButton';
import LogoutButton from '../components/navigations/LogoutButton';
import i18n from '../lang/i18n';
import colors from '../constants/colors';

const CustomDrawerContent = (props) => {
  const { SwitchLanguage } = props;

  const IsLoginData = useRecoilValue(IsLogin);
  const UserNameData = useRecoilValue(UserName);
  const UserPictureData = useRecoilValue(UserPicture);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View>
              <Avatar
                style={styles.avatar}
                source={UserPictureData ? { uri: UserPictureData } : ProfileImage}
              />
            </View>
            <View style={styles.name}>
              <Text category="h6" numberOfLines={1}>{UserNameData || i18n.t('Navigation.Name')}</Text>
            </View>
            {/* Show when user login. */}
            {IsLoginData
              && (
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
              )}
          </View>
          <View style={styles.drawerSection}>
            <View style={{}}>
              <DrawerItemList {...props} />
              <View style={styles.bottomDrawerSection}>
                <DrawerItem
                  label={i18n.t('Navigation.SwitchLanguage')}
                  onPress={() => SwitchLanguage()}
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
        {IsLoginData ? <LogoutButton /> : <LoginButton />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.primary,
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
