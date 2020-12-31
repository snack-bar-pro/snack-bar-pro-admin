import {get} from '../utils/httpHelper';
import getBaseUrl from '../utils/getBaseUrl'
export const getHistoryOrderData = async () => {
  let url = `${getBaseUrl()}/orders`;
  const result = await get(url);
  return result.data;
};
