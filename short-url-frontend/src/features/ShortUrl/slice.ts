import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { ShortUrl } from './type';
import * as Service from './service';

const name = 'short-url';

export const fetchAll = createAsyncThunk(`${name}/fetchAll`, async () => {
  return await Service.FetchAll().then((res) => res.data.data);
});

export const fetchByCode = createAsyncThunk(
  `${name}/fetchByCode`,
  async (payload: { code: string }) => {
    return await Service.FetchByCode(payload).then((res) => res.data.data);
  }
);
``;
export const create = createAsyncThunk(
  `${name}/create`,
  async (payload: { long_url: string }) => {
    return await Service.Create(payload).then((res) => res.data.data);
  }
);

export const update = createAsyncThunk(
  `${name}/update`,
  async (payload: { long_url: string; code: string }) => {
    return await Service.Update(payload).then((res) => res.data.data);
  }
);

export const remove = createAsyncThunk(
  `${name}/remove`,
  async (payload: { code: string }) => {
    await Service.Remove(payload).then((res) => res.data.data);
    return payload;
  }
);

type Loading = 'idle' | 'pending' | 'succeeded' | 'failed';

interface State {
  createLoading: Loading;
  updateLoading: Loading;
  removeLoading: Loading;
  fetchByCodeLoading: Loading;
  fetchAllLoading: Loading;
  openDialogEdit: boolean;
  selectedShortUrl: ShortUrl | null;
  shortUrlList: ShortUrl[];
}

const initialState: State = {
  createLoading: 'idle',
  updateLoading: 'idle',
  removeLoading: 'idle',
  fetchByCodeLoading: 'idle',
  fetchAllLoading: 'idle',
  openDialogEdit: false,
  selectedShortUrl: null,
  shortUrlList: [],
};

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    setCreateLoading: (state, action: PayloadAction<Loading>) => {
      state.createLoading = action.payload;
    },
    setUpdateLoading: (state, action: PayloadAction<Loading>) => {
      state.updateLoading = action.payload;
    },
    setRemoveLoading: (state, action: PayloadAction<Loading>) => {
      state.removeLoading = action.payload;
    },
    setFetchAllLoading: (state, action: PayloadAction<Loading>) => {
      state.fetchAllLoading = action.payload;
    },
    setFetchByCodeLoading: (state, action: PayloadAction<Loading>) => {
      state.fetchByCodeLoading = action.payload;
    },
    setOpenDialogEdit: (state, action: PayloadAction<boolean>) => {
      state.openDialogEdit = action.payload;
    },
    setSelectedShortUrl: (state, action: PayloadAction<ShortUrl | null>) => {
      state.selectedShortUrl = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.pending, (state) => {
        state.fetchAllLoading = 'pending';
      })
      .addCase(fetchAll.rejected, (state) => {
        state.fetchAllLoading = 'failed';
      })
      .addCase(
        fetchAll.fulfilled,
        (state, action: PayloadAction<ShortUrl[]>) => {
          state.fetchAllLoading = 'succeeded';
          state.shortUrlList = action.payload;
        }
      );

    builder
      .addCase(fetchByCode.pending, (state) => {
        state.fetchByCodeLoading = 'pending';
      })
      .addCase(fetchByCode.rejected, (state) => {
        state.fetchByCodeLoading = 'failed';
      })
      .addCase(fetchByCode.fulfilled, (state) => {
        state.fetchByCodeLoading = 'succeeded';
      });

    builder
      .addCase(create.pending, (state) => {
        state.createLoading = 'pending';
      })
      .addCase(create.rejected, (state) => {
        state.createLoading = 'failed';
      })
      .addCase(create.fulfilled, (state, action: PayloadAction<ShortUrl>) => {
        state.createLoading = 'succeeded';
        state.shortUrlList = [action.payload, ...state.shortUrlList];
      });

    builder
      .addCase(update.pending, (state) => {
        state.updateLoading = 'pending';
      })
      .addCase(update.rejected, (state) => {
        state.updateLoading = 'failed';
      })
      .addCase(update.fulfilled, (state, action: PayloadAction<ShortUrl>) => {
        state.updateLoading = 'succeeded';
        state.shortUrlList = [action.payload].concat(
          state.shortUrlList.filter((item) => item.code !== action.payload.code)
        );
        state.openDialogEdit = false;
        state.selectedShortUrl = null;
      });

    builder
      .addCase(remove.pending, (state) => {
        state.removeLoading = 'pending';
      })
      .addCase(remove.rejected, (state) => {
        state.removeLoading = 'failed';
      })
      .addCase(
        remove.fulfilled,
        (state, action: PayloadAction<{ code: string }>) => {
          state.removeLoading = 'succeeded';
          state.shortUrlList = state.shortUrlList.filter(
            (item) => item.code !== action.payload.code
          );
        }
      );
  },
});

export default slice.reducer;

export const {
  setCreateLoading,
  setFetchAllLoading,
  setFetchByCodeLoading,
  setRemoveLoading,
  setUpdateLoading,
  setOpenDialogEdit,
  setSelectedShortUrl,
} = slice.actions;

const selectShortUrl = (state: RootState) => state.shortUrl;

export const selectShortUrlList = createSelector(
  selectShortUrl,
  (state) => state.shortUrlList
);

export const selectCreateLoading = createSelector(
  selectShortUrl,
  (state) => state.createLoading
);

export const selectUpdateLoading = createSelector(
  selectShortUrl,
  (state) => state.updateLoading
);
export const selectRemoveLoading = createSelector(
  selectShortUrl,
  (state) => state.removeLoading
);
export const selectFetchAllLoading = createSelector(
  selectShortUrl,
  (state) => state.fetchAllLoading
);
export const selectFetchByCodeLoading = createSelector(
  selectShortUrl,
  (state) => state.fetchByCodeLoading
);

export const selectOpenDialogEdit = createSelector(
  selectShortUrl,
  (state) => state.openDialogEdit
);

export const selectSelectedShortUrl = createSelector(
  selectShortUrl,
  (state) => state.selectedShortUrl
);
