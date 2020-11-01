import { atom } from 'recoil';
import * as Localization from 'expo-localization';

const defaultLocate = Localization.locale;

export const locate = atom({
  key: 'locateData',
  default: defaultLocate,
});

export default 'atom';
