export default {

    namespace: 'businessTypes',

    state: {
        loading:false,
    },

    subscriptions: {
        // setup({dispatch, history}) {
        //     history.listen(location => {
        //         if (location.pathname === '/login') {
        //
        //         }
        //     });
        // },
    },

    effects: {
        // call是调用执行一个函数，而put则是相当于dispatch执行一个action
        // select则可以用来访问其它model
    },

    reducers: {
        showLoading(state) {
            return { ...state, loading: true };
        },
        hideLoading(state) {
            return { ...state, loading: false };
        }
    }

};
