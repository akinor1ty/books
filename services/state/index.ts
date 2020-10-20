import { createStore, Reducer } from "redux";

export type RootState = {
  favoriteBooks: string[];
};

const initialState: RootState = {
  favoriteBooks: [],
};

/**
 * Action types
 */
export const TOGGLE_FAVORITE_BOOK = "TOGGLE_FAVORITE_BOOK";

/**
 * Action creators
 */
export const toggleFavoriteBook = (id: string) => {
  return { type: TOGGLE_FAVORITE_BOOK, payload: { id } };
};

/**
 * Selectors
 */
export const isFavorite = (id: string) => (state: RootState) =>
  !!state.favoriteBooks.find((bookId) => bookId === id);

const reducer: Reducer<RootState> = (state, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE_BOOK: {
      const { id } = action.payload;
      const { favoriteBooks } = state;
      const index = state.favoriteBooks.findIndex((bookId) => bookId === id);

      return {
        favoriteBooks:
          index === -1
            ? [...favoriteBooks, id]
            : favoriteBooks.filter((bookId) => bookId !== id),
      };
    }
  }
  return initialState;
};

export const store = createStore(reducer);
