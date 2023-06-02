import { Module } from "vuex";
import { RootState } from "./mainStore";
import { FormModel } from "@/models/form";
import { UidModel } from "@/models/uid";

export interface formState {
    cvObject: FormModel;
    lastUid: UidModel;
    viewSwitchValue: number;
    inspectMode: boolean;
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
            ID: 0,
            name: "",
            surname: "",
            phone_nr: "",
            email: "",
            work: [{
                ID: 0,
                work_place: "",
                work_position: "",
                work_load: "",
                work_experience: 0,
            }],
            education: [{
                ID: 0,
                education_institution: "",
                education_faculty: "",
                education_field_of_study: "",
                education_level: "",
                education_status: "",
                education_time_spent: 0,
            }],
            address: [{
                ID: 0,
                address_country: "",
                address_index: "",
                address_city: "",
                address_street: "",
                address_number: ""
            }],
            custom: [{
                ID: 0,
                custom_name: "",
                custom_value: ""
            }],
            created_at: "",
            updated_at: "",
        },
        lastUid: {
            last_work_ID: 0,
            last_education_ID: 0,
            last_address_ID: 0,
            last_custom_ID: 0
        },
        viewSwitchValue: 0,
        inspectMode: false
    },
    mutations: {
        resetCvObject(state) {
            state.cvObject = {
                ID: 0,
                name: "",
                surname: "",
                phone_nr: "",
                email: "",
                work: [{
                    ID: 0,
                    work_place: "",
                    work_position: "",
                    work_load: "",
                    work_experience: 0,
                }],
                education: [{
                    ID: 0,
                    education_institution: "",
                    education_faculty: "",
                    education_field_of_study: "",
                    education_level: "",
                    education_status: "",
                    education_time_spent: 0,
                }],
                address: [{
                    ID: 0,
                    address_country: "",
                    address_index: "",
                    address_city: "",
                    address_street: "",
                    address_number: ""
                }],
                custom: [{
                    ID: 0,
                    custom_name: "",
                    custom_value: ""
                }],
                created_at: "",
                updated_at: "",
            };
        },
        updateCvObject(state, newCvObject: FormModel) {
            state.cvObject = newCvObject;
        },
        updateInspectMode(state, payload) {
            state.inspectMode = payload;
        },
        mutateFormPart(state, payload: UpdateFormPartPayload) {
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
        updateLastUidPart(state, payload: { part: keyof UidModel; uuid: number, viewUpdate: number }) {
            const { part, uuid, viewUpdate } = payload;
            state.lastUid[part] = uuid;
            state.viewSwitchValue = viewUpdate;
        },
        changeViewSwitchValue(state, value) {
            state.viewSwitchValue = value;
        },
    },
    actions: {
        resetCvObjectAction({ commit }) {
            commit("resetCvObject");
        },
        updateCvObjectAction({ commit }, newCvObject: FormModel) {
            commit("updateCvObject", newCvObject);
        },
        updateInspectMode({ commit }, project) {
            commit("updateInspectMode", project);
        },
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
        changeLastUid({ commit }, payload: { part: keyof UidModel; uuid: number, viewUpdate: number }) {
            commit("updateLastUidPart", payload);
        },
        updateViewSwitchValue({ commit }, value) {
            commit("changeViewSwitchValue", value);
        },
    },
    getters: {
        getForm(state) {
            return state.cvObject;
        },
        getLastUid(state) {
            return state.lastUid
        },
        getViewSwitchValue(state) {
            return state.viewSwitchValue
        },
        getInspectMode(state) {
            return state.inspectMode
        }
    },
};
