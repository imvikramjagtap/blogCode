const initialState = {
    data: null,
    loginState: false
}

const auth = (state=initialState, action)=>{
    if(action.type === "login"){
        return {
            data: action.payload,
            loginState:true
        }
    }else if(action.type === "logout"){
        return initialState
    }else{
        return state
    }
}

export default auth;