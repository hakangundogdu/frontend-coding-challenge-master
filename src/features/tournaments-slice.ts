import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { API_TOURNAMENTS_URL } from '../constants/api';

export type Tournament = {
  id: string;
  name: string;
  organizer: string;
  game: string;
  participants: {
    current: number;
    max: number;
  };
  startDate: string;
};
type Update = {
  id: string;
  name: string;
};

type InitialState = {
  loading: boolean;
  tournaments: Tournament[];
  error: string;
};
const initialState: InitialState = {
  loading: false,
  tournaments: [],
  error: ''
};

// Generates pending, fulfilled and rejected action types
export const fetchTournaments = createAsyncThunk(
  'tournament/fetchTournaments',
  (q?: string) => {
    return axios
      .get(`${API_TOURNAMENTS_URL}?q=${q ?? ''}`)
      .then(response => response.data);
  }
);

export const createTournament = createAsyncThunk(
  `tournament/createTournament`,
  (tournamentName: string) => {
    return axios
      .post(`${API_TOURNAMENTS_URL}`, { name: tournamentName })
      .then(response => response.data);
  }
);

export const updateTournament = createAsyncThunk(
  `tournament/updateTournament`,
  (payload: Update) => {
    return axios
      .patch(`${API_TOURNAMENTS_URL}/${payload.id}`, {
        name: payload.name
      })
      .then(response => response.data);
  }
);

export const deleteTournament = createAsyncThunk(
  `tournament/deleteTournament`,
  (id: string) => {
    axios.delete(`${API_TOURNAMENTS_URL}/${id}`);
    return id;
  }
);

const tournamentsSlice = createSlice({
  name: 'tournaments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTournaments.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      fetchTournaments.fulfilled,
      (state, action: PayloadAction<Tournament[]>) => {
        state.loading = false;
        state.tournaments = action.payload;
        state.error = '';
      }
    );
    builder.addCase(fetchTournaments.rejected, (state, action) => {
      state.loading = false;
      state.tournaments = [];
      state.error = 'Something went wrong.';
    });
    builder.addCase(
      createTournament.fulfilled,
      (state, action: PayloadAction<Tournament>) => {
        state.loading = false;
        state.tournaments.push(action.payload);
        state.error = '';
      }
    );
    builder.addCase(
      updateTournament.fulfilled,
      (state, action: PayloadAction<Update>) => {
        state.loading = false;
        const index = state.tournaments.findIndex(
          tournament => tournament.id === action.payload.id
        );
        state.tournaments[index].name = action.payload.name;
        state.error = '';
      }
    );
    builder.addCase(
      deleteTournament.fulfilled,
      (state, action: PayloadAction<String>) => {
        state.loading = false;
        state.tournaments = state.tournaments.filter(
          tournament => tournament.id !== action.payload
        );
        state.error = '';
      }
    );
  }
});

export default tournamentsSlice.reducer;
