import {alterMessageType} from '../enum/Enum';

export const getMessageColorByCode = code => {
  for (let key in alterMessageType) {
    if (alterMessageType[key].code == code) {
      return alterMessageType[key].color;
    }
  }
};
