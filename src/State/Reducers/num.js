const initialState = 10

const num = (state = initialState, action) =>{
    if(action.type === "add"){
        return state + action.payload
    }else if (action.type === "sub"){
        return state - action.payload
    }else{
        return state;
    }
}

export default num;