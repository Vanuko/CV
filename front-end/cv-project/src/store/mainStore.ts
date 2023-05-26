import Vuex from "vuex";

import { formStore, formState } from "./formStore";


export interface RootState {
  formStore: formState;

}

export default new Vuex.Store({
  modules: {
    formStore,
  },
});
