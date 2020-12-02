// theirs
import React from 'react'
// components
import LoadingIcon from '../loadingIcons/LoadingIcon'
import SomethingWentWrong from '../SomethingWentWrong'
// utils
import { useFetch } from '../../../hooks/useFetch'

const DataFetcher = ({ action, fetcherDeps, loadingIconCustomStyles, loadingIconTimeout=200, children }) => {
  const { data, loading, error } = useFetch(action, fetcherDeps)

  if (error) {
    return <SomethingWentWrong />
  }

  if (loading) {
    /** dirty way to avoid flash of loading component */
    setTimeout(() => {
      return loadingIconCustomStyles ? (
        <LoadingIcon loadingIconCustomStyles={loadingIconCustomStyles} />
      ) : (
        <LoadingIcon />
      )
    }, loadingIconTimeout);
    
  }

  if (!data) return null

  return children(data)
}

export default DataFetcher
