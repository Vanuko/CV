import { Module } from "vuex";
import { RootState } from "./mainStore";
import { FormModel } from "@/models/form";

export interface formState {
    cvObject: FormModel;
}

interface UpdateFormPartPayload {
    part: keyof FormModel;
    value: any; //Keeping any in this case is optimal
    arrayKeyName: keyof FormModel;
    object: {};
    uuid: number;
}

export const formStore: Module<formState, RootState> = {
    state: {
        cvObject: {
            ID: 2,
            name: "MyName",
            surname: "MySurname",
            phone_nr: "+37129420729",
            email: "myname.surname@inbox.lv",
            work: [{
                ID: 0,
                work_place: "Burger Place",
                work_position: "Burger flipper",
                work_load: "Full-time",
                work_experience: 2,
            }],
            education: [{
                ID: 0,
                education_institution: "Uni-place",
                education_faculty: "Faculty example",
                education_field_of_study: "IT",
                education_level: "Bachelor",
                education_status: "Completed",
                education_time_spent: 4,
            }],
            address: [{
                ID: 0,
                address_country: "Latvia",
                address_index: "LV-4033",
                address_city: "Liepāja",
                address_street: "Street",
                address_number: "16c"
            }],
            custom: [{
                ID: 0,
                custom_name: "Language skills",
                custom_value: "Latvian, čigan, ruzz"
            }],
            created_at: "",
            updated_at: "",
        }
    },
    mutations: {
        mutateFormPart(state, payload: UpdateFormPartPayload) {
            console.log("payload: ", payload)
            const { part, value, arrayKeyName, uuid } = payload;
            if (arrayKeyName && state.cvObject && state.cvObject[arrayKeyName] !== null) {
                const requiredArray = state.cvObject[arrayKeyName];
                if (Array.isArray(requiredArray)) {
                    const index = requiredArray.findIndex(object => object.ID === uuid);
                    if (index !== -1) {
                        const updatedObject = { ...requiredArray[index], [part]: value };
                        requiredArray.splice(index, 1, updatedObject as any);
                    }
                }
            } else {
                state.cvObject[part] = value;
            }
        },
        addObject(state, payload: UpdateFormPartPayload) {
            const { arrayKeyName, object } = payload;
            if (arrayKeyName && state.cvObject && state.cvObject[arrayKeyName] !== null) {
                const requiredArray = state.cvObject[arrayKeyName];
                if (Array.isArray(requiredArray)) {
                    requiredArray.push(object as any);
                }
            }
        },
        deleteObject(state, payload: UpdateFormPartPayload) {
            const { arrayKeyName, uuid } = payload;
            if (arrayKeyName && state.cvObject && state.cvObject[arrayKeyName] !== null) {
                const requiredArray: any[] | null = state.cvObject[arrayKeyName] as any[] | null;
                if (Array.isArray(requiredArray)) {
                    const index = requiredArray.findIndex((obj: any) => obj.ID === uuid);
                    if (index !== -1) {
                        requiredArray.splice(index, 1);
                    }
                }
            }
        },
    },
    actions: {
        updateFormPart({ commit }, payload: UpdateFormPartPayload) {
            commit("mutateFormPart", payload);
        },
        attachObject({ commit, state }, payload: UpdateFormPartPayload) {
            const { arrayKeyName, object } = payload;
            if (arrayKeyName && state.cvObject && state.cvObject[arrayKeyName] !== null) {
                const requiredArray = state.cvObject[arrayKeyName];
                if (Array.isArray(requiredArray)) {
                    commit('addObject', { arrayKeyName, object: object });
                }
            }
        },
        removeObject({ commit }, payload) {
            commit('deleteObject', payload);
        },
    },
    getters: {
        getForm(state) {
            return state.cvObject;
        },
    },
};
