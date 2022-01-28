import React, { createContext, useContext, useReducer } from "react";
// Data Layer

export const StateContext = createContext();

// build a provider that will wrap our application

export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {/* Children refer to the App in our use cases */}
        {children}
    </StateContext.Provider>
);

// this how we use it inside a component

export const useStateValue = () => useContext(StateContext);
