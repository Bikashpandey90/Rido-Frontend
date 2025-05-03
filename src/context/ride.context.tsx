import { useState } from "react"
import { createContext } from "react"

export const RideContext = createContext({})

export const RideContextProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {

    const [hasAcceptedRide, setHasAcceptedRide] = useState(false)

    const [currentRide, setCurrentRide] = useState<any>(null)


    return (
        <>

            <RideContext.Provider value={{ hasAcceptedRide, setHasAcceptedRide, currentRide, setCurrentRide }}>
                {children}
            </RideContext.Provider>


        </>
    )

}