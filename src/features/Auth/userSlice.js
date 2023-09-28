import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StorageKeys from "constants/storage-keys";
import userApi from "../../api/userApi";

export const register = createAsyncThunk(
    'users/register',
    async (payload) => {
        const data = await userApi.register(payload);
        // save dât on localStorage
        localStorage.setItem(StorageKeys.TOKEN, data.data.jwt);
        localStorage.setItem(StorageKeys.USER, JSON.stringify(data.data.user));
        
        return data.data.user;
    }
)

export const login = createAsyncThunk(
    'users/login',
    async (payload) => {
        const data = await userApi.login(payload);
        console.log(data.data);
        localStorage.setItem(StorageKeys.TOKEN, data.data.jwt);
        localStorage.setItem(StorageKeys.USER, JSON.stringify(data.data.user));
        return data.data.user;
    }
);

const userSlice = createSlice({
    
    name: "user",
    initialState: {
        current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
        setting: {},
    },
    reducers: {
        logout(state) {
            localStorage.removeItem(StorageKeys.USER);
            localStorage.removeItem(StorageKeys.TOKEN);
            state.current = {};
        }
    },
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.current = action.payload;
            
        },

        [login.fulfilled]: (state, action) => {
            state.current = action.payload;
            
        },
    }
})

const { reducer, actions } = userSlice;
export const { logout } = actions;
export default reducer;


//     extraReducers: (builder) => {
//         builder.addCase(login.fulfilled, (state, action) => {
//             state.current = action.payload; // Cập nhật state sau khi login thành công
//         });
