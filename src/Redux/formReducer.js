import { createSlice } from "@reduxjs/toolkit";

const FormSlice = createSlice({
    name: 'formData',
    initialState: {
        name: null,
        email: null,
    },

    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setName : (state, action) => {
            state.name = action.payload
        },
        clearAll: state => {
            state.name = null
            state.email = null
        },
    },
  
})

export const { clearAll, setEmail, setName } = FormSlice.actions
export default FormSlice.reducer;

