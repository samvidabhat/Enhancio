const reducers = (state={},action) =>{
    console.log(action);
    if(action.type === 'SET_USER_DETAILS'){
        return {
            ...state,
            githubrepos:action.payload
        }
    }else{
        return {
            ...state
        }
    }
}
export default reducers;