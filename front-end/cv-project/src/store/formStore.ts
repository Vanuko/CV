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
            name: "MyName",
            surname: "MySurname",
            phone_nr: "+37129420729",
            email: "myname.surname@inbox.lv",
            work: [{
                ID: "base",
                work_place: "Burger Place",
                work_position: "Burger flipper",
                work_load: "Full-time",
                work_experience: 2,
            },
            {
                ID: "Notbase",
                work_place: "IT Company",
                work_position: "Alcoholic",
                work_load: "Half-time",
                work_experience: 3,
            }],
            education: [{
                ID: "base",
                education_institution: "Uni-place",
                education_faculty: "Faculty example",
                education_field_of_study: "IT",
                education_level: "Bachelor",
                education_status: "Completed",
                education_time_spent: 4,
            }],
            address: [{
                ID: "base",
                address_country: "Latvia",
                address_index: "LV-4033",
                address_city: "Liepāja",
                address_street: "Street",
                address_number: "16c"
            }],
            custom: [{
                ID: "base",
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
