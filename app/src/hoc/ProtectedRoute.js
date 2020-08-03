import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { RingLoader } from 'react-spinners'
import { useFetch } from '../hooks/useFetch'
import { AUTH_ENDPOINT } from '../config/api-config'

const ProtectedRoute = ({ ComposedComponent, ...rest }) => {
  const res = useFetch(AUTH_ENDPOINT)

  if(!res.response) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh'
        }}
      >
        <RingLoader size={140} />
      </div>
    )
  } else {
    const isAuthenticated = res.response.data.is_authenticated
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
  }
}

export default ProtectedRoute