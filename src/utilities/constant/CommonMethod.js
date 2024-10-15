import {alertMessageType} from '../enum/Enum';

export const getMessageColorByCode = code => {
  for (let key in alertMessageType) {
    if (alertMessageType[key].code == code) {
      return alertMessageType[key].color;
    }
  }
};
