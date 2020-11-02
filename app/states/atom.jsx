import { atom } from 'recoil';
import * as Localization from 'expo-localization';

const DefaultLocate = Localization.locale;

export const Locate = atom({
  key: 'LocateData',
  default: DefaultLocate,
});

export default 'atom';
