import { Module } from "vuex";
import { RootState } from "./mainStore";

export interface formState {
    testing: string;
}

export const formStore: Module<formState, RootState> = {
    state: {
        testing: "",
    },
    mutations: {
        setTesting(state, payload) {
            state.testing = payload;
        },
    },
    actions: {
        updateTesting(context, testing) {
            context.commit("setTesting", testing);
        },
    },
    getters: {
        getTesting(state) {
            return state.testing;
        },
    },
};
