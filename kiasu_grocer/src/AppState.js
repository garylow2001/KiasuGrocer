import React from 'react';
import {createStore} from 'redux';


const initialState = {
    isLoggedIn : false,
    userLoggedIn : null,
}

// REDUCER

const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isLoggedIn: true,
                userLoggedIn: action.payload.username,
            }
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false,
                userLoggedIn: null,
            }
        default:
            return state;
    }
}

// STORE => global state
// export const store = createStore(globalReducer);


// ACTION
export const login = (username, password) => {
    return {
        type: 'LOGIN',
        payload: {username, password},
    }
}
export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}




export default globalReducer;

// DISPATCH

