const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');

const initialState = {
    loading: false,
    error: '',
    users: [],
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';

const fetch_users_request = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetch_users_success = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetch_users_error = error => {
    return {
        type: FETCH_USERS_ERROR,
        payload: error
    }
}

const usersreducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USERS_REQUEST:
            return {...state, loading: true }
        case FETCH_USERS_SUCCESS:
            return {...state, loading: false, users: action.payload, error: ''}
        case FETCH_USERS_ERROR:
            return {...state, loading: false, users: [], error: action.payload}
        default:
            return state;
    }
}

//thunk ability is to return a function instead of an action object
const fetchusers = () => {
    return (dispatch) => {
        dispatch(fetch_users_request());
        axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
            const users = response.data;
            dispatch(fetch_users_success(users));
        }).catch(error => {            
            dispatch(fetch_users_error(error.message));
        });
    }
}
const store = createStore(usersreducer, applyMiddleware(thunkMiddleware));
console.log("initial state ", store.getState());
const unsubscribe = store.subscribe(()=> console.log("updated ", store.getState()));
store.dispatch(fetchusers());


