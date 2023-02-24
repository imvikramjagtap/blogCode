

export const add = (num) =>{
    return{
        type:"add",
        payload: num
    }
};

export const sub = (num) =>{
    return{
        type:"sub",
        payload:num
    }
}


export const login = (user) =>{
    return{
        type:"login",
        payload:user
    }
}

export const logout = () =>{
    return{
        type:"logout",
    }
}