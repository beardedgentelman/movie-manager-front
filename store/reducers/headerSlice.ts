import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { headerTitle: string } = {
  headerTitle: '',
};

export const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setHeaderTitle: (state, action: PayloadAction<string>) => {
      state.headerTitle = action.payload;
    },
    clearHeaderTitle: (state) => {
      state.headerTitle = '';
    },
  },
});

export const { setHeaderTitle, clearHeaderTitle } = headerSlice.actions;
export default headerSlice.reducer;
