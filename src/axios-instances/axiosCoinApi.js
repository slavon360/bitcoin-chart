import axios from 'axios';
import { COIN_API_KEY } from '../variables/keys';

const instance = axios.create({
  baseURL: 'https://rest.coinapi.io/'
});

instance.defaults.headers.get['X-CoinAPI-Key'] = COIN_API_KEY;

export default instance;
