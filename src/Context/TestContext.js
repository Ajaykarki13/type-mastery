
import { createContext, useState, useContext } from "react";

const TestContext = createContext();

export const TestContextProvider = ({children})=>{

  const [testTime, setTestTime] = useState(15)
const values = {testTime,setTestTime}
  return (
    <TestContext.Provider value ={values}>
      {children}
    </TestContext.Provider>
  )
}

export const useTestMode = ()=> useContext(TestContext)