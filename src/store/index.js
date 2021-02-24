import {createStore} from 'vuex'

export default createStore({
    state() {
        return {
            count: 0,
            user: {},
            welcome: "welcome"
        }
    },
    mutations: {
        increment(state) {
            state.count++
        },
        setUser(state, user) {
            state.user = user
        }
    }
})

