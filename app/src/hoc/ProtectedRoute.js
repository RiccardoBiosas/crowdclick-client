// theirs
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
// components
import DataFetcher from '../shared/components/DataFetcher'
// utils
import crowdclickClient from '../services/api/crowdclickService'
// constants
import { REGISTER_FALLBACK_ROUTE } from '../constants/config/routes-config'

const ProtectedRoute = ({ ComposedComponent, ...rest }) => {
  return (
    <DataFetcher action={crowdclickClient.login.get}>
      {data => {
        const isAuthenticated = data.is_authenticated
        if (isAuthenticated) {
          return (
            <Route
              {...rest}
              render={props => {
                return <ComposedComponent {...props} />
              }}
            />
          )
        } else {
          return <Redirect to={REGISTER_FALLBACK_ROUTE} />
        }
      }}
    </DataFetcher>
  )
}

export default ProtectedRoute
