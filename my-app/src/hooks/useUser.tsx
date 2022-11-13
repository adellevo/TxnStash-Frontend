import axios from "axios"
const FLASK_BACKEND = process.env.FLASK_BACKEND
export const loadStashes = async (userID:string)=> {
    return []
}

export const loadWallets = async (userID:string) => {
    
}

export const login =  async (username:String,password:string) => { 
    const res = await axios.post(`${FLASK_BACKEND}/login`,
        {"username":username,"password":password}
    )
    console.log("REQUEST Result",res)
    return res.data
} 

export const signup =  async (username:String,password:string) => { 
    const res = await axios.post("http://localhost:5000/signup",
        {"username":username,"password":password}
    )
    console.log("REQUEST Result",res)
    return res.data
} 