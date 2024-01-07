import { createSlice } from "@reduxjs/toolkit";

const postsData = createSlice({
    name: 'postsData',
    initialState: {
        data: []
     
    },

    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        clearAll: state => {
            state.data = []
        },
       
    },
  
})

export const { clearAll, setData } = postsData.actions
export default postsData.reducer;

