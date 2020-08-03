import React, { Suspense, lazy } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Drizzle } from '@drizzle/store'
import { DrizzleContext } from '@drizzle/react-plugin'
import { ProtectedRoute } from './hoc/ProtectedRoute'

import Homepage  from './routes/homepage/containers/index'
import  NavbarWrapper from './shared/components/navbars/NavbarWrapper'
import withDrizzleInitializer from './hoc/withDrizzleInitializer'
import options from './drizzleOptions'
import { SignupFallback } from './routes/register/screen/SignupFallback'
import {
  REGISTER_FALLBACK_ROUTE,
  PUBLISHER_DASHBOARD_ROUTE,
  PUBLISHER_WIZARD_ROUTE,
  PUBLISHER_WIZARD_EDIT_ROUTE_WITH_PARAM,
  USER_TASKS_LIST_ROUTE,
  USER_TASK_ROUTE_WITH_PARAM,
  USER_WITHDRAW_ROUTE,
  NO_METAMASK_ROUTE,
} from './config/routes-config'
import WithdrawBalance from './routes/withdraw/WithdrawComponent'
import InstallMetamaskWarning from './routes/no-metamask/screen/InstallMetamaskWarning'
import EthereumListener from './shared/components/ethereumListener/EthereumListener'
import LoadingIcon from './shared/components/loadingIcons/LoadingIcon'

// const Homepage = lazy(() => {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(import('./routes/homepage/containers/index')), 3000);
//   });
// });
const  TaskIframe  = lazy(() => import('./routes/task/containers/TaskIframe/index'))
const NotFound = lazy(() => import('./routes/404/NotFound'))
const TasksConsoleDashboard = lazy(() => import('./routes/user-tasks/containers/index')) 
const PublisherDashboardContainer = lazy(() => import('./routes/publisher-dashboard/containers/index'))
const PublisherWizardFormContainer = lazy(() => import('./routes/publisher-dashboard__new-task/containers'))
const EditPublisherWizardFormCampaignContainer = lazy(() => import('./routes/publisher-dashboard__edit-task/EditPublisherWizardFormCampaignContainer'))


export const drizzle = new Drizzle(options)

const App = () => {
  const history = createBrowserHistory()

  return (
    <HashRouter path={window.location.hostname} history={history}>
      <DrizzleContext.Provider drizzle={drizzle}>
        <Route path="/" component={NavbarWrapper} />
        <Route path="/" component={EthereumListener} />

        <Suspense fallback={LoadingIcon()}>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path={REGISTER_FALLBACK_ROUTE} component={SignupFallback} />

            <ProtectedRoute
              exact
              path={USER_TASKS_LIST_ROUTE}
              component={TasksConsoleDashboard}
            />

            <Route
              path={`${USER_TASK_ROUTE_WITH_PARAM}:id`}
              component={() => withDrizzleInitializer(TaskIframe)}
            />

            <Route
              path={NO_METAMASK_ROUTE}
              component={InstallMetamaskWarning}
            />

            <ProtectedRoute
              exact
              path={PUBLISHER_WIZARD_ROUTE}
              component={() =>
                withDrizzleInitializer(PublisherWizardFormContainer)
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
              component={PublisherDashboardContainer}
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
