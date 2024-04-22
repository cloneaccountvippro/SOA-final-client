import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserState {
    id: number,
    name: string,
    role: string,
    isLogin: boolean,
}

const initialState: UserState = {
    id: 0,
    name: "",
    role: "",
    isLogin: false,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetUserState: () => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(updateAutheticationStatusAsync.pending, () => {
            console.log("Updating user status...")
        })
        .addCase(updateAutheticationStatusAsync.fulfilled, (state, action) => {
            state.id += action.payload.id
            state.name = action.payload.name
            state.role = action.payload.role
            state.isLogin = action.payload.isLogin
        })
    }
})

export const updateAutheticationStatusAsync = createAsyncThunk(
    "user/updateAutheticationStatusAsync",
    async (data: {id: number, name: string, role: string, isLogin: boolean}) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return data
    }
)

export const {resetUserState} = userSlice.actions
export default userSlice.reducer;
