// theirs
import React from 'react'
// components
import LoadingIcon from '../loadingIcons/LoadingIcon'
import SomethingWentWrong from '../SomethingWentWrong'
// utils
import { useFetch } from '../../../hooks/useFetch'

const DataFetcher = ({ action, children, loadingIconCustomStyles }) => {
  const { data, loading, error } = useFetch(action)

  if (error) {
    return <SomethingWentWrong />
  }

  if (loading) {
    return loadingIconCustomStyles ? (
      <LoadingIcon loadingIconCustomStyles={loadingIconCustomStyles} />
    ) : (
      <LoadingIcon />
    )
  }

  if (!data) return null

  return children(data)
}

export default DataFetcher
