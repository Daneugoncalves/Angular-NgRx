import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./reducers";

export const selectorAuthState = createFeatureSelector<AuthState>("auth");

export const isLoggedIn = createSelector(
    // state => state["auth"],
    selectorAuthState,
    (auth) => !!auth.user
);

export const isLoggedOut = createSelector(
    isLoggedIn,
    (loggedIn) => !loggedIn
);

