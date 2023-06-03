<template>
  <div class="inspect-view-template">
    <div class="displayed-cv">
      <div class="base-data-block">
        <div class="cv-name-block cv-title-text">
          {{ formData.name }} {{ formData.surname }}
        </div>
        <div class="cv-contact-info-block">
          <div class="tiny-text-bold">
            {{ formData.phone_nr }}
          </div>
          <div class="tiny-text-bold">
            {{ formData.email }}
          </div>
        </div>
      </div>
      <div class="work-data-block" v-if="!formData.work.length <= 0">
        <div class="cv-section-title-text">
          {{ workExperienceText }}
        </div>
        <div
          class="work-data-element"
          v-for="workElement in formData.work"
          :key="workElement"
        >
          <config-hover
            class="hoverDisplay"
            @deleteEmit="deleteObject(workElement.ID, workKey)"
            @editEmit="
              editObjective(workElement.ID, lastWorkUidKeyName, workView)
            "
          />
          <div class="date-field">
            {{ workElement.work_experience }}
          </div>
          <div>
            <div class="work-position-element medium-text-bold">
              {{ workElement.work_position }}
            </div>
            <div class="work-place-element small-text-italic">
              <div>
                {{ workElement.work_place }}
              </div>
              <div>
                {{ workElement.work_load }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="education-data-block" v-if="!formData.education.length <= 0">
        <div class="cv-section-title-text">
          {{ educationExperienceText }}
        </div>
        <div
          class="education-data-element"
          v-for="educationElement in formData.education"
          :key="educationElement"
        >
          <config-hover
            class="hoverDisplay"
            @deleteEmit="deleteObject(educationElement.ID, eduKey)"
            @editEmit="
              editObjective(
                educationElement.ID,
                lasteducationUidKeyName,
                educationView
              )
            "
          />
          <div class="date-field">
            <div>
              {{ educationElement.education_time_spent }}
            </div>
            <div>
              {{ educationElement.education_status }}
            </div>
          </div>
          <div class="education-information-data">
            <div class="education-institution-data medium-text-bold">
              <div>{{ educationElement.education_institution }}</div>
              <div class="medium-text-bold">
                {{ educationElement.education_faculty }}
              </div>
            </div>
            <div class="study-field-data small-text-italic">
              <div>
                {{ educationElement.education_field_of_study }}
              </div>
              <div>
                {{ educationElement.education_level }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="address-data-block" v-if="!formData.address.length <= 0">
        <div class="cv-section-title-text">
          {{ addressText }}
        </div>
        <div
          class="address-data-element"
          v-for="addressElement in formData.address"
          :key="addressElement"
        >
          <config-hover
            class="hoverDisplay"
            @deleteEmit="deleteObject(addressElement.ID, addressKey)"
            @editEmit="
              editObjective(
                addressElement.ID,
                lastAddressUidKeyName,
                addressView
              )
            "
          />
          <div class="first-location-data-block medium-text-bold">
            <div>{{ addressElement.address_country }}</div>
            <div v-if="addressElement.address_city">
              , {{ addressElement.address_city }}
            </div>
            <div v-if="addressElement.address_index">
              , {{ addressElement.address_index }}
            </div>
          </div>
          <div class="second-location-data-block medium-text-bold">
            <div class="street-name" v-if="addressElement.address_street">
              {{ addressElement.address_street }}
            </div>
            <div>{{ addressElement.address_number }}</div>
          </div>
        </div>
      </div>
      <div v-if="!formData.custom.length <= 0">
        <div
          class="custom-data-block"
          v-for="customElement in formData.custom"
          :key="customElement"
        >
          <config-hover
            class="hoverDisplay"
            @deleteEmit="deleteObject(customElement.ID, customKey)"
            @editEmit="
              editObjective(customElement.ID, lastCustomUidKeyName, customView)
            "
          />
          <div class="cv-section-title-text">
            {{ customElement.custom_name }}
          </div>
          <div class="tiny-text-bold">
            {{ customElement.custom_value }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="!hideInspectButtons" class="cv-inspect-button-block">
      <button-component :buttonText="backText" @click="back()" />
      <button-component
        :buttonStyle="editStyleText"
        :buttonText="editText"
        @click="edit()"
      />
    </div>
  </div>
</template>

<script lang="ts" >
import { defineComponent } from "vue";
import store from "../store/mainStore";
import configHover from "../components/FormComponents/FormHoverConfig.vue";
import * as keyNames from "../constants/KeyNameConstants";
import * as viewNumbers from "../constants/ViewConstants";
import buttonComponent from "../components/GenericComponents/Button.vue";
import router from "../router/index";

export default defineComponent({
  name: "Inspect",
  components: { configHover, buttonComponent },
  data() {
    return {
      workExperienceText: "Darba pieredze", //const
      educationExperienceText: "Izglītība", //const
      addressText: "Adrese", //const
      workKey: keyNames.WORK,
      eduKey: keyNames.EDU,
      addressKey: keyNames.ADDRESS,
      customKey: keyNames.CUS,
      lastWorkUidKeyName: keyNames.LAST_WORK,
      lasteducationUidKeyName: keyNames.LAST_EDU,
      lastAddressUidKeyName: keyNames.LAST_ADDRESS,
      lastCustomUidKeyName: keyNames.LAST_CUS,
      workView: viewNumbers.WORK,
      educationView: viewNumbers.EDUCATION,
      addressView: viewNumbers.ADDRESS,
      customView: viewNumbers.CUSTOM,
      editText: "REDIĢĒT", //const,
      backText: "ATPAKAĻ", //const
      editStyleText: "editStyle", //const
    };
  },
  methods: {
    back() {
      router.push("/");
    },
    edit() {
      store.dispatch("updateInspectMode", true);
      router.push("/edit");
    },
    deleteObject(uid: number, keyName: string) {
      store.dispatch("removeObject", { arrayKeyName: keyName, uuid: uid });
    },
    editObjective(uid: number, keyName: string, viewSwitch: number) {
      store.dispatch("changeLastUid", {
        part: keyName,
        uuid: uid,
        viewUpdate: viewSwitch,
      });
    },
  },
  computed: {
    formData() {
      return store.getters.getForm;
    },
    hideInspectButtons() {
      return store.getters.getHideInspectButtons;
    },
  },
  mounted() {
    store.dispatch("updateHideInspectButtons", false);
  },
});
</script>
<style lang="scss" scoped>
@import "../assets/colors.scss";

.inspect-view-template {
  display: flex;
  flex-direction: column;
  align-items: center;
  .hoverDisplay {
    display: none;
  }
  display: flex;
  justify-content: center;

  $displayed-cv-height: rem(297mm);
  $displayed-cv-width: rem(210mm);
  $displayed-cv-margin-top: rem(30px);
  $displayed-cv-padding: rem(1cm);
  .displayed-cv {
    padding: $displayed-cv-padding;
    box-sizing: border-box;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-self: center;
    align-items: center;
    width: $displayed-cv-width;
    height: $displayed-cv-height;
    margin-top: $displayed-cv-margin-top;
    background: $white;

    $form-block-margin-top: rem(20px);
    $form-block-border-width: rem(0px 0px 1px 0px);
    > div:not(:first-child) {
      width: 100%;
      margin-top: $form-block-margin-top;
      border-width: $form-block-border-width;
      border-color: black; //colors.scss
      border-style: solid; //colors.scss
      padding-bottom: 8px; //SCSS
    }
    .base-data-block {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .cv-name-block {
      }
      .cv-contact-info-block {
        display: flex;
        flex-direction: column;
        margin-left: auto;
        align-items: flex-end;
      }
    }

    .work-data-block {
      display: flex;
      flex-direction: column;
      .work-data-element {
        display: flex;
        position: relative;
        div:nth-child(2) {
          display: flex;
          flex-direction: column;
          .work-position-element {
            width: fit-content;
            margin-bottom: 5px; //SCSS
          }
          .work-place-element {
            display: flex;
            flex-direction: row;
            div {
              width: fit-content;
            }
            div:nth-child(1) {
              margin-right: 5px; //SCSS
            }
          }
        }
      }
      .work-data-element:hover {
        .hoverDisplay {
          display: flex;
        }
      }
    }
    .education-data-block {
      .education-data-element {
        display: flex;
        position: relative;
        > .education-information-data {
          display: flex;
          flex-direction: column;
          width: 100%;
          .education-institution-data {
            flex-direction: column;
          }
          .study-field-data {
            display: flex;
            > div:nth-child(1) {
              margin-right: 5px; //SCSS
            }
          }
        }
      }
      .education-data-element:hover {
        .hoverDisplay {
          display: flex;
        }
      }
    }
    .address-data-block {
      .address-data-element {
        display: flex;
        flex-direction: column;
        position: relative;
        .first-location-data-block {
          display: flex;
        }
        .second-location-data-block {
          display: flex;
          .street-name {
            margin-right: 10px; //SCSS
          }
        }
      }
      .address-data-element:hover {
        .hoverDisplay {
          display: flex;
        }
      }
    }
    .custom-data-block {
      position: relative;
      .custom-data-element {
      }
    }
    .custom-data-block:hover {
      .hoverDisplay {
        display: flex;
      }
    }
    .date-field {
      width: 3cm; //SCSS
    }
    .cv-section-title-text {
      border-style: solid;
      border-width: 0px 0px 1px 0px;
      margin-bottom: 15px;
    }
  }
  .cv-inspect-button-block {
    display: flex;
    justify-content: space-between;
    width: 210mm; //SCSS
    margin-top: 10px; //SCSS
  }
}
</style>