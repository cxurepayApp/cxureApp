import { useContext } from "react"
import { RegisterContext } from "../contexts/RegisterContext"

export const useRegister = () =>{
    const context = useContext(RegisterContext)

    if(!context){
        throw new Error ('useRegister must be used with RegisterProvider')
    }

    return context
}