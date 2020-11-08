import { PortisConnector } from '@web3-react/portis-connector'
import { InjectedConnector } from '@web3-react/injected-connector';

import PortisApi from '@portis/web3';

// const { InjectedConnector, PortisConnector } = Connectors;


const Injected = new InjectedConnector({ supportedNetworks: [3, 5] });

const Portis = new PortisConnector({
  api: PortisApi,
  dAppId: '8a078969-f7ef-4c30-86c2-b8a2c06f22b6',
  networks: [5],
});

export default {
  Injected,
  Portis,
};