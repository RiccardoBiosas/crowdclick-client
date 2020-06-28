import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Drizzle } from "@drizzle/store";
import { DrizzleContext } from "@drizzle/react-plugin";
import { ProtectedRoute } from "./hoc/ProtectedRoute";
import { Homepage } from "./routes/homepage/containers/index";
import { TaskIframe } from "./routes/task/containers/TaskIframe/index";
import { NotFound } from "./routes/404/NotFound";
import { NavbarWrapper } from "./shared/components/navbars/NavbarWrapper";
import { TasksConsoleContainer } from "./routes/user-tasks/containers/index";
import { PublisherDashboardContainer } from "./routes/publisher-dashboard/containers/index";
import { PublisherWizardFormContainer } from "./routes/publisher-dashboard__new-task/containers";
import { EditPublisherWizardFormContainer } from "./routes/publisher-dashboard__edit-task/EditPublisherWizardFormCampaignContainer";
import { WithDrizzleInitializer } from "./hoc/withDrizzleInitializer";
import options from "./drizzleOptions";
import { SignupFallback } from "./routes/register/screen/SignupFallback";
import {
  REGISTER_FALLBACK_ROUTE,
  PUBLISHER_DASHBOARD_ROUTE,
  PUBLISHER_WIZARD_ROUTE,
  PUBLISHER_WIZARD_EDIT_ROUTE_WITH_PARAM,
  USER_TASKS_LIST_ROUTE,
  USER_TASK_ROUTE_WITH_PARAM,
  USER_WITHDRAW_ROUTE,
} from "./config/routes-config";
import WithdrawBalance from "./routes/withdraw/WithdrawComponent";

export const drizzle = new Drizzle(options);

const App = () => {
  const history = createBrowserHistory();

  return (
    <HashRouter path={window.location.hostname} history={history}>
      <DrizzleContext.Provider drizzle={drizzle}>
        <Route path="/" component={NavbarWrapper} />

        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path={REGISTER_FALLBACK_ROUTE} component={SignupFallback} />

          <ProtectedRoute
            exact
            path={USER_TASKS_LIST_ROUTE}
            component={TasksConsoleContainer}
          />

          <Route
            path={`${USER_TASK_ROUTE_WITH_PARAM}:id`}
            component={() => WithDrizzleInitializer(TaskIframe)}
          />

          <ProtectedRoute
            exact
            path={PUBLISHER_WIZARD_ROUTE}
            component={() =>
              WithDrizzleInitializer(PublisherWizardFormContainer)
            }
          />

          <ProtectedRoute
            exact
            path={`${PUBLISHER_WIZARD_EDIT_ROUTE_WITH_PARAM}:id`}
            component={() =>
              WithDrizzleInitializer(EditPublisherWizardFormContainer)
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
            component={WithdrawBalance}
          />

          <Route path="*" component={NotFound} />
        </Switch>
      </DrizzleContext.Provider>
    </HashRouter>
  );
};

export default App;
