import { Connectors } from 'web3-react';
import PortisApi from '@portis/web3';

const { InjectedConnector, PortisConnector } = Connectors;


const Injected = new InjectedConnector({ supportedNetworks: [3, 5] });

const portis = new PortisConnector({
  api: PortisApi,
  dAppId: '8a078969-f7ef-4c30-86c2-b8a2c06f22b6',
  network: 'ropsten',
});

export default {
  Injected,
  portis,
};