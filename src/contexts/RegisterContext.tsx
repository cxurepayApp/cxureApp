import React, { createContext, useEffect, useState } from "react";
import { RegisterData } from "../types/register";

interface RegisterContextType{
    data: Partial<RegisterData>
    updateData: (updatedData:Partial<RegisterData>) => void
    clearData: () => void
}

interface RegisterContextProviderProps{
    children: React.ReactNode
}
export const RegisterContext = createContext<RegisterContextType | null>(null)

export const RegisterProvider = ({children}:RegisterContextProviderProps) =>{

    const [data, setData] = useState<Partial<RegisterData>>({
        name: "",
        email: "",
        tel: "",
        address: "",
        userTag: "",
        userImg: null,
        password: "",
        confirmPassword: "",
        securityQuestion: "",
        securityAnswer: "",
        twoFactorEnabled: false,
        role: "buyer",
    })
        
    useEffect(()=>{
        const saved = localStorage.getItem("formData")
        if(saved){
            setData(JSON.parse(saved))
        }else{
            setData({})
        }
    }, [])

    useEffect(()=>{
        const {userImg, password, confirmPassword, ...canSave} = data
        localStorage.setItem("formData", JSON.stringify(canSave))
    },[data])

    function updateData(updatedData:Partial<RegisterData>){
        setData(prev => {
            return {...prev, ...updatedData}
        })
    }

    function clearData(){
        setData({});
        localStorage.removeItem("formData");
    }


    
    return (
        <RegisterContext.Provider value={{data, updateData , clearData}}>
            {children}
        </RegisterContext.Provider>
    )
}