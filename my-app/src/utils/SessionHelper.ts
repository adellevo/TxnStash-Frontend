export const saveUser = (user:any)=>{
    sessionStorage.setItem("user", user);
}

export const clearUser = (user:any)=>{
    sessionStorage.removeItem("user")
}

export const getUser = ()=>{
    return sessionStorage.getItem("user");
}