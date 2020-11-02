import React from 'react';
import { StyleSheet } from 'react-native';
import { DrawerItem } from '@react-navigation/drawer';
import { Icon } from '@ui-kitten/components';
import { useSetRecoilState } from 'recoil';
import {
  IsLogin, UserID, UserName, UserPicture,
} from '../../states/auth';
import i18n from '../../lang/i18n';

const LogoutButton = () => {
  const setIsLogin = useSetRecoilState(IsLogin);
  const setUserID = useSetRecoilState(UserID);
  const setUserName = useSetRecoilState(UserName);
  const setUserPicture = useSetRecoilState(UserPicture);

  const Logout = () => {
    setIsLogin(false);
    setUserID(null);
    setUserName(null);
    setUserPicture(null);
  };

  return (
    <DrawerItem
      label={i18n.t('Navigation.SignOut')}
      onPress={() => Logout()}
      icon={({ color }) => (
        <Icon
          style={styles.icon}
          fill={color}
          name="log-out"
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 22,
    width: 22,
  },
});

export default LogoutButton;
