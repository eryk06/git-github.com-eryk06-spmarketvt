import * as _ from 'lodash';

export const getInfoData = ({ filed = [], object = {} }) => {
  return _.pick(object, filed);
};
