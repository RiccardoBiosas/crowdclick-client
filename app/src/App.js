// theirs
import React, { useState, useEffect, Suspense, lazy, useLayoutEffect, useCallback } from 'react'
import { Drizzle, generateStore, generateContractsInitialState } from '@drizzle/store'
import { useSelector, useDispatch } from 'react-redux'

import { HashRouter, Route, Switch } from 'react-router-dom'
import Web3Provider from 'web3-react'
import { DrizzleContext } from '@drizzle/react-plugin'
import Portis from "@portis/web3";
import Web3 from "web3";


// HOC
import withDrizzleInitializer from './hoc/withDrizzleInitializer'
import connectors from './connectors/portis';
// constants
import options from './drizzleOptions'
import {returnDrizzleOptions} from './drizzleOptions'

import {
  REGISTER_FALLBACK_ROUTE,
  PUBLISHER_DASHBOARD_ROUTE,
  PUBLISHER_WIZARD_ROUTE,
  PUBLISHER_WIZARD_EDIT_ROUTE_WITH_PARAM,
  USER_TASKS_LIST_ROUTE,
  USER_TASK_ROUTE_WITH_PARAM,
  USER_WITHDRAW_ROUTE,
  NO_METAMASK_ROUTE,
  TUTORIAL_ROUTE,
} from './config/routes-config'
// components
import Homepage  from './routes/homepage/containers/index'
import NavbarWrapper from './shared/components/navbars/NavbarWrapper'
import EthereumListener from './shared/components/ethereumListener/EthereumListener'
import LoadingIcon from './shared/components/loadingIcons/LoadingIcon'
import ProtectedRoute from './hoc/ProtectedRoute'
import Tutorial from './shared/components/tutorial/screen'
import ethereumHandler from './utils/blockchain/ethereumHandler'
const TaskIframeContainer  = lazy(() => import('./routes/task/containers/TaskIframe/index'))
const SignupFallback  = lazy(() => import('./routes/register/screen/SignupFallback'))
const NotFound = lazy(() => import('./routes/404/NotFound'))
const WithdrawBalance = lazy(() => import('./routes/withdraw/WithdrawComponent'))
const InstallMetamaskWarning = lazy(() => import('./routes/no-metamask/screen/InstallMetamaskWarning'))
const TasksConsoleDashboardContainer = lazy(() => import('./routes/user-tasks/containers/index')) 
const PublisherDashboardContainer = lazy(() => import('./routes/publisher-dashboard/containers/index'))
const PublisherWizardFormContainer = lazy(() => import('./routes/publisher-dashboard__new-task/containers'))
const EditPublisherWizardFormCampaignContainer = lazy(() => import('./routes/publisher-dashboard__edit-task/EditPublisherWizardFormCampaignContainer'))


// const drizzle = new Drizzle(options)
const App = () => {
  const selectedContract = useSelector(({ethereumContractReducer}) => ethereumContractReducer).drizzleOptions
  console.log('selected contract selectedcontract ')
  console.log(selectedContract)
  const [drizzleOptions, setDrizzleOptions] = useState(new Drizzle(selectedContract))
  const [state, setState] = useState(new Drizzle(selectedContract))


  // useEffect(() => {
  //   if(drizzleOptions && drizzleOptions.store) {
  //     console.log('drizzle options is ')
  //     console.log(drizzleOptions)
  //     const drizzleSub = drizzleOptions.store.subscribe(() => {
  //       const drizzleState = drizzleOptions.store.getState()
  //       console.log('current drizzlestate is ', drizzleState)
  //     })

  //   }
  //   if(selectedContract) {
  //     console.log('########################### ')
  //     console.log('selected contract/drizzle options were updated')
  //     console.log(selectedContract)
  //     const drizzleOptions = generateStore(selectedContract)
  //     setDrizzleOptions(drizzleOptions)
  //     debugger
  //     console.log('## DRIZZLE OPTIONS AFTER SETTING THE STATE IS with NEW')
  //     console.log(drizzleOptions)
  //     console.log('##################################')
      
  //   }
  // }, [selectedContract, setDrizzleOptions, drizzleOptions])
  const setContext = useCallback(
    (update) => {
      setState(new Drizzle(update))
    },
    [state, setState, selectedContract],
  )

  // here context value is just returning an object, but only re-creating the object when its dependencies change ([state, setContext])
  const getContextValue = useCallback(
    () => state,
    [state, setContext, selectedContract],

  // here we only re-create setContext when its dependencies change ([state, setState])
  useEffect(() => {
    if (selectedContract)
      setContext(selectedContract)
  }, [selectedContract])
  )
console.log('DRIZZLE SHITTY OPTIONS BEFORE RENDER')
console.log(drizzleOptions)

  return (
    <HashRouter>
      <DrizzleContext.Provider drizzle={getContextValue()}>
        <Route path="/" component={NavbarWrapper} />
        {/* <Route path="/" component={EthereumListener} /> */}

        <Suspense fallback={<LoadingIcon />}>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path={REGISTER_FALLBACK_ROUTE} component={SignupFallback} />
            <Route
              path={NO_METAMASK_ROUTE}
              component={InstallMetamaskWarning}
            />
            <Route exact path={TUTORIAL_ROUTE} component={Tutorial} />
            <ProtectedRoute
              exact
              path={USER_TASKS_LIST_ROUTE}
              component={TasksConsoleDashboardContainer}
            />

            <ProtectedRoute
              path={`${USER_TASK_ROUTE_WITH_PARAM}:id`}
              component={() => withDrizzleInitializer(TaskIframeContainer)}
            />

            <ProtectedRoute
              exact
              path={PUBLISHER_WIZARD_ROUTE}
              component={() => withDrizzleInitializer(PublisherWizardFormContainer)
              }
            />

            <ProtectedRoute
              exact
              path={`${PUBLISHER_WIZARD_EDIT_ROUTE_WITH_PARAM}:id`}
              component={() =>
                withDrizzleInitializer(EditPublisherWizardFormCampaignContainer)
              }
            />

            <ProtectedRoute
              exact
              path={PUBLISHER_DASHBOARD_ROUTE}
              component={() => withDrizzleInitializer(PublisherDashboardContainer)}
            />

            <ProtectedRoute
              exact
              path={USER_WITHDRAW_ROUTE}
              component={() => withDrizzleInitializer(WithdrawBalance)}
            />

            <Route path="*" component={NotFound} />
          </Switch>
        </Suspense>
      </DrizzleContext.Provider>
    </HashRouter>
  )
}

export default App
