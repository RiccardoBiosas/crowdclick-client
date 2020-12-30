// theirs
import React, { Suspense, lazy } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
// HOC
import withWeb3Initializer from './hoc/withWeb3Initializer'
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
  PUBLISHER_WITHDRAW_ROUTE,
  LEARN_MORE_ROUTE
} from './constants/config/routes-config'
// components
import Homepage  from './routes/homepage/containers/index'
import NavbarWrapper from './shared/components/navbars/NavbarWrapper'
import LoadingIcon from './shared/components/loadingIcons/LoadingIcon'
import ProtectedRoute from './hoc/ProtectedRoute'
const PublisherWithdraw = lazy(() => import( './routes/publisher-withdraw'))
const UserWithdraw = lazy(() => import('./routes/user-withdraw'))
const Tutorial = lazy(() => import('./shared/components/tutorial/screen'))
const LearnMore = lazy(() => import('./routes/learn-more'))
const TaskIframeContainer  = lazy(() => import('./routes/task/containers/TaskIframe/index'))
const SignupFallback  = lazy(() => import('./routes/register/screen/SignupFallback'))
const NotFound = lazy(() => import('./routes/404/NotFound'))
const InstallMetamaskWarning = lazy(() => import('./routes/no-metamask/screen/InstallMetamaskWarning'))
const TasksConsoleDashboardContainer = lazy(() => import('./routes/user-tasks/containers/index')) 
const PublisherDashboardContainer = lazy(() => import('./routes/publisher-dashboard/containers/index'))
const PublisherWizardFormContainer = lazy(() => import('./routes/publisher-dashboard__new-task/containers'))
const EditPublisherWizardFormCampaignContainer = lazy(() => import('./routes/publisher-dashboard__edit-task/EditPublisherWizardFormCampaignContainer'))

const App = () => {

  return (
    <HashRouter>
        <Route path="/" component={NavbarWrapper} />

        <Suspense fallback={<LoadingIcon />}>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path={REGISTER_FALLBACK_ROUTE} component={SignupFallback} />
            <Route
              path={NO_METAMASK_ROUTE}
              component={InstallMetamaskWarning}
            />
            <Route exact path={TUTORIAL_ROUTE} component={Tutorial} />
            <Route exact path={LEARN_MORE_ROUTE} component={LearnMore} />

            <ProtectedRoute
              exact
              path={USER_TASKS_LIST_ROUTE}
              component={() => withWeb3Initializer(TasksConsoleDashboardContainer)}
            />

            <ProtectedRoute
              path={`${USER_TASK_ROUTE_WITH_PARAM}:id`}
              component={() => withWeb3Initializer(TaskIframeContainer)}
            />

            <ProtectedRoute
              exact
              path={PUBLISHER_WIZARD_ROUTE}
              component={() => withWeb3Initializer(PublisherWizardFormContainer)
              }
            />

            <ProtectedRoute
              exact
              path={`${PUBLISHER_WIZARD_EDIT_ROUTE_WITH_PARAM}:id`}
              component={() =>
                withWeb3Initializer(EditPublisherWizardFormCampaignContainer)
              }
            />

            <ProtectedRoute
              exact
              path={PUBLISHER_DASHBOARD_ROUTE}
              component={() => withWeb3Initializer(PublisherDashboardContainer)}
            />

            <ProtectedRoute
              exact
              path={USER_WITHDRAW_ROUTE}
              component={() => withWeb3Initializer(UserWithdraw)}
            />

            <ProtectedRoute
              exact
              path={PUBLISHER_WITHDRAW_ROUTE}
              component={() => withWeb3Initializer(PublisherWithdraw)}
            />

            <Route path="*" component={NotFound} />
          </Switch>
        </Suspense>
    </HashRouter>
  )
}

export default App
