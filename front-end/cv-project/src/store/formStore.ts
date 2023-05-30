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
}

export const formStore: Module<formState, RootState> = {
    state: {
        cvObject: {
            ID: 2,
            name: "TestName",
            surname: "TestName",
            phone_nr: "TestPhone_NR",
            email: "TestEmail",
            work: [{
                ID: "base",
                work_place: "TestWorkData",
                work_position: "",
                work_load: "",
                work_experience: 0,
            },
            {
                ID: "Notbase",
                work_place: "TestWorkData2",
                work_position: "",
                work_load: "",
                work_experience: 0,
            }],
            education: [{
                ID: "base",
                education_institution: "",
                education_faculty: "",
                education_field_of_study: "",
                education_level: "",
                education_status: "",
                education_time_spent: 0,
            }],
            address: [{
                ID: "base",
                address_country: "",
                address_index: "",
                address_city: "",
                address_street: "",
                address_number: ""
            }],
            custom: null,
            created_at: "",
            updated_at: "",
        }
    },
    mutations: {
        mutateFormPart(state, payload: UpdateFormPartPayload) {
            console.log("payload: ", payload)
            const { part, value, arrayKeyName } = payload;
            if (arrayKeyName && state.cvObject && state.cvObject[arrayKeyName] !== null) {
                const requiredArray = state.cvObject[arrayKeyName];
                if (Array.isArray(requiredArray)) {
                    const index = requiredArray.findIndex(object => object.ID === 'base');
                    if (index !== -1) {
                        const updatedObject = { ...requiredArray[index], [part]: value };
                        requiredArray.splice(index, 1, updatedObject as any);
                    }
                }
            } else {
                state.cvObject[part] = value;
            }
        },
    },
    actions: {
        updateFormPart({ commit }, payload: UpdateFormPartPayload) {
            commit("mutateFormPart", payload);
        },
    },
    getters: {
        getForm(state) {
            return state.cvObject;
        },
    },
};
