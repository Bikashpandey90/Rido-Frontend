import { get } from "@/config/axios.config";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({})

export const AuthProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {

    const [data, setData] = useState<any>()
    const [loading, setLoading] = useState(true)


    const getLoggedInUser = async () => {
        try {

            const token = localStorage.getItem('token') || null
            if (token) {
                const response = await get('/auth/me', {
                    headers: {
                        'Authorization': "Bearer " + localStorage.getItem('token'),
                    }
                }) as any


                setData(response.data.detail)

            }
            console.log(loading)


        } catch (exception) {
            console.log(exception)
        }
        finally {
            setLoading(false)
        }
    }
    const getLoggedInRider = async () => {
        try {

            const token = localStorage.getItem('token') || null
            if (token) {
                const response = await get('/auth/me-rider', {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem('token')

                    }
                }) as any


                setData(response.data.detail)

            }
            console.log(loading)


        } catch (exception) {
            console.log(exception)
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getLoggedInRider()

    }, [])
    useEffect(() => {
        getLoggedInUser()
    }, [])


    return (<>
        <AuthContext.Provider value={{ loggedInUser: data || null, setLoggedInUser: setData }}>
            {
                children
            }

        </AuthContext.Provider>
    </>)


}