import { useState, useEffect } from 'react'

export const useFetch = (axiosCallback, initialData) => {
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchUrl = async () => {
    setLoading(true)
    try {
      const response = await axiosCallback()
      setData(response.data)
      setLoading(false)
    } catch (err) {
      setError(true)
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchUrl()
  }, [])

  return { data, loading, error }
}
