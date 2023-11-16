import { createContext } from "react"
const FrankStoreData = createContext(null)
const FrankStoreContext = ({ children }) => {

    const contextData = {

    }
    return (
        <FrankStoreData.Provider value={contextData}>
            {children}
        </FrankStoreData.Provider>
    )
}

export default FrankStoreContext
