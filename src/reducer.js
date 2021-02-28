export const initialState={
    ID:null,
};


const reducer=(state,action)=>{
    console.log(action)
    switch(action.type)
    {
        case "ADD_ID":
            return{
                ...state,
                ID: action.item,
            };

        default:
            return state;
    }
};
export default reducer;