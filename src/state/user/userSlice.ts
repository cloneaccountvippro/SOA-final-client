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
        setLoginStatus: (state, action) => {
            state.isLogin = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(updateAutheticationStatusAsync.pending, () => {
            console.log("Updating user status...")
        })
        .addCase(updateAutheticationStatusAsync.fulfilled, (state, action) => {
            state.id = action.payload.id
            state.name = action.payload.name
            state.role = action.payload.role
        })
    }
})

export const updateAutheticationStatusAsync = createAsyncThunk(
    "user/updateAutheticationStatusAsync",
    async (data: {id: number, name: string, role: string}) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return data
    }
)

export const { setLoginStatus } = userSlice.actions
export const {resetUserState} = userSlice.actions
export default userSlice.reducer;
