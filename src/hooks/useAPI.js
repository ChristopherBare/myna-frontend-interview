import { useState, useEffect } from 'react'

const useAPI = (url, body) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {

            try {
                setIsLoading(true)
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(body)
                })


                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`)
                }

                const jsonData = await response.json()
                setData(jsonData)
                setIsLoading(false)
            } catch (err) {
                setError(err)
                setIsLoading(false)
            }
        }

        fetchData()
    }, [body.variables.search])

    return { data, isLoading, error }
}

export default useAPI