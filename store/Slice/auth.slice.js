import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username:''
};

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser(state,action){
            state.username = action.payload
        },
    },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;