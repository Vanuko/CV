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
            ID: 14,
            name: "MyName3",
            surname: "MySurname23",
            phone_nr: "+3712942072923",
            email: "myname.surname@inbox.lv3",
            work: [{
                ID: 0,
                work_place: "Burger Place2",
                work_position: "Burger flipper2",
                work_load: "Full-time2",
                work_experience: 4,
            }],
            education: [{
                ID: 0,
                education_institution: "Uni-place2",
                education_faculty: "Faculty example2",
                education_field_of_study: "IT2",
                education_level: "Bachelor2",
                education_status: "Completed2",
                education_time_spent: 6,
            }],
            address: [{
                ID: 0,
                address_country: "Latvia2",
                address_index: "LV-40332",
                address_city: "Liepāja2",
                address_street: "Street2",
                address_number: "16c2"
            }],
            custom: [{
                ID: 0,
                custom_name: "Language skills2",
                custom_value: "Latvian"
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
