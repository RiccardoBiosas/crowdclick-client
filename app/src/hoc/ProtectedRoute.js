// theirs
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
// components
import DataFetcher from '../shared/components/DataFetcher'
// utils
import crowdclickClient from '../utils/api/crowdclick'

const ProtectedRoute = ({ ComposedComponent, ...rest }) => {
  return (
    <DataFetcher action={crowdclickClient.login.get}>
      {data => {
        console.log('INSIDE DATA FETCH DATA IS ', data)
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
          return <Redirect to='/' /> //pass param to communicate whether user is auth or not
        }
      }}
    </DataFetcher>
  )
}

export default ProtectedRoute
