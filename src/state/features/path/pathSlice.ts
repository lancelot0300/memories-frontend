import { createSlice, createAsyncThunk, PayloadAction, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import axios, { AxiosError, CancelTokenSource } from "axios";
import { LoginResponse, Path, Response, UnknownPathResponse } from "../../../types";
import { loginSuccess } from "../auth/authSlice";
import { RejectedWithValueActionFromAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import { clearFiles } from "../files/filesSlice";

type InitialState = {
  data: Response;
  actualPath: Path[];
  history: Path[];
  status: "idle" | "loading" | "failed" | "completed";
  error: string | null;
  cache: { [key: string]: Response };
};


const refreshPath = async (
  dispatch: ThunkDispatch<unknown, unknown, UnknownAction>,
  next: (path: string) => Promise<Response> | Promise<UnknownPathResponse>,
  path: string 
) => {

  try {
    const response = await axios.get<LoginResponse>(
      `${process.env.REACT_APP_API_URL}/token/refresh`,
      {
        withCredentials: true,
      }
    );
    dispatch(loginSuccess(response.data.user));
    return await next(path); 
  } catch (e) {
    const error = e as AxiosError
    throw error
  }

};

let cancelSource: CancelTokenSource
 const setPathAsync = createAsyncThunk(
  "path/setPathAsync",
  async (path: string, { rejectWithValue, dispatch, getState }) => {

    const { path: { cache } } = getState() as { path: InitialState }

    if(cache[path]) {
      return cache[path]
    }

    const fetchPath = async (path: string) => {
      if (cancelSource) {
        cancelSource.cancel("New request initiated");
      }
      cancelSource = axios.CancelToken.source();
      const url = `${process.env.REACT_APP_API_URL}/folder/${path}`;
    
      try {
        const { data } = await axios.get<Response>(
          url,
          {
            withCredentials: true,
            cancelToken: cancelSource.token,
          }
        );
        return data as Response;
      }
      catch(e) {
        const error = e as AxiosError
        throw error
      }
    };

    try {
      const data = await fetchPath(path);
      return data
    }
    catch (e) {
      const error = e as AxiosError

      if(error.response?.status === 401) {
       try {
        const response = await refreshPath(
          dispatch,
          async (path) => {
            return await fetchPath(path); 
          },
          path 
        );
        if(!response) return rejectWithValue("Failed to refresh path")
          return response as Response
       } catch (e) {
          const error = e as AxiosError
          return rejectWithValue(error.message)
       }
      }

      return rejectWithValue(error.message)
    }

  }
);

export const setUnknownPathAsync = createAsyncThunk(
  "path/setUnknownPathAsync",
  async (path: string, { rejectWithValue, dispatch, getState }) => {

    const { path: { cache } } = getState() as { path: InitialState }

    if(cache[path]) {
      return cache[path]
    }

      if (cancelSource) {
        cancelSource.cancel("New request initiated");
      }
      cancelSource = axios.CancelToken.source();


      const fetchPath = async (path: string) => {
        const url = path
          ? `${process.env.REACT_APP_API_URL}/folder/path/${path}`
          : `${process.env.REACT_APP_API_URL}/folder`;

        const { data } = await axios.get(url, {
          withCredentials: true,
          cancelToken: cancelSource.token,
        });

        const dataIsUnknownPathResponse = "path" in data;

        const newState = {
          folder: (dataIsUnknownPathResponse ? data.folder : data) as Response,
          path: (dataIsUnknownPathResponse ? data.path : [{ id: data.id, name: null }]) as Path[],
        };
        return newState as UnknownPathResponse;
      };

      try {
        const data = await fetchPath(path);
        return data
      } catch (e) {
        const error = e as AxiosError;
        if(error.response?.status === 401) {
         try{
          const response = await refreshPath(
            dispatch,
            async (path) => {
              return await fetchPath(path); 
            },
            path 
          );
          if(!response) return rejectWithValue("Failed to refresh path")
          return response as UnknownPathResponse
         }
         catch (e) {
          const error = e as AxiosError
          return rejectWithValue(error.message)
         }
        }
        return rejectWithValue(error.message)
      }
    } 
);

export const setNewPathAndFetchAsync = createAsyncThunk(
  "path/setNewPathAndFetchAsync",
  async (path: Path, { dispatch }) => {
    dispatch(setNewPath(path));
    await dispatch(setPathAsync(path.id));
  }
);

export const setActualPathAndFetchAsync = createAsyncThunk(
  "path/setActualPathAndFetchAsync",
  async (index: number, { dispatch, getState }) => {
    if (index === (getState() as { path: InitialState }).path.actualPath.length - 1) return;
    dispatch(setActualPath(index));
    await dispatch(setPathAsync((getState() as { path: InitialState }).path.actualPath[index].id));
  }
);

export const setUnkownPathAndFetchAsync = createAsyncThunk(
  "path/setUnkownPathAndFetchAsync",
  async (id: string, { dispatch, rejectWithValue }) => {
    const response = await dispatch(setUnknownPathAsync(id));
    if(response.meta.requestStatus === "rejected") return rejectWithValue(response.payload)
    return response.payload as UnknownPathResponse
  }
);

export const refreshPathAsync = createAsyncThunk(
  "path/refreshPathAsync",
  async (pathToRefresh: string, { getState, dispatch }) => {
    const { actualPath } = (getState() as { path: InitialState }).path;
    dispatch(refreshCashe(pathToRefresh));
    dispatch(clearFiles())
    if (actualPath[actualPath.length - 1].id === pathToRefresh) {
      await dispatch(setPathAsync(actualPath[actualPath.length - 1].id));
    }
  }
);


const initialState: InitialState = {
  data: {
    id: "",
    parentFolderId: "",
    folderDetails: null,
    files: [],
    childFolders: [],
  },
  actualPath: [],
  history: [],
  status: "idle",
  error: null,
  cache: {},
};

const pathSlice = createSlice({
  name: "path",
  initialState,
  reducers: {
    setNewPath: (state, action: PayloadAction<Path>) => {
      state.actualPath.push(action.payload);
      state.history = [...state.actualPath];
    },
    setActualPath: (state, action: PayloadAction<number>) => {
      state.actualPath = state.history.slice(0, action.payload + 1);
    },
    refreshCashe: (state, action: PayloadAction<string>) => {
      const path = action.payload;
      delete state.cache[path];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        setPathAsync.fulfilled,
        (state, action: PayloadAction<Response>) => {
          state.data = action.payload;
          state.status = "completed";
          state.error = null;
          state.cache[action.payload.id] = action.payload
        }
      )
      .addCase(setPathAsync.rejected, (state, action: RejectedWithValueActionFromAsyncThunk<typeof setPathAsync>) => {
        state.status = action.payload === "New request initiated" ? "loading" : "failed"
        state.error = action.payload as string
      })
      .addCase(setPathAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(setUnkownPathAndFetchAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(setUnkownPathAndFetchAsync.fulfilled, (state, action) => {
        const payload = action.payload as UnknownPathResponse;
        state.data = payload.folder;
        state.actualPath = payload.path;
        state.history = payload.path;
        state.error = null;
        state.status = "completed";
        state.cache[payload.folder.id] = payload.folder
      })
      .addCase(setUnkownPathAndFetchAsync.rejected, (state, action: RejectedWithValueActionFromAsyncThunk<typeof setUnkownPathAndFetchAsync>) => {
        state.status = "failed";
        state.error = action.payload as string
      })
  },
});

export const getActualPath = (state: InitialState) =>
  state.actualPath[state.actualPath.length - 1];

export const isNextPathInHistory = (state: InitialState) =>
  state.history.length > state.actualPath.length;

export const { setActualPath, setNewPath, refreshCashe } = pathSlice.actions;

export default pathSlice.reducer;
