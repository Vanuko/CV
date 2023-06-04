<template>
  <div class="inspect-view-template">
    <div class="displayed-cv" ref="displayedCV">
      <div class="base-data-block">
        <div class="cv-title-text">
          {{ formData.name }} {{ formData.surname }}
        </div>
        <div class="cv-contact-info-block">
          <div v-if="formData.phone_nr.length > 0" class="tiny-text-bold">
            {{ nrText }}{{ formData.phone_nr }}
          </div>
          <div v-if="formData.email.length > 0" class="tiny-text-bold">
            {{ emailText }}{{ formData.email }}
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
          <div class="date-field tiniest-text-bold">
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
          <div class="date-field tiniest-text-bold">
            <div>
              {{ educationElement.education_time_spent }}
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
              <div>
                {{ educationElement.education_status }}
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
      <div
        v-for="pagination in paginationCount"
        :key="pagination"
        class="page-break"
        :style="{ marginTop: `${maxOffsetHeight * pagination}px` }"
      ></div>
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
import * as textConstants from "../constants/TextConstants";
import * as valueConstants from "../constants/ValueConstants";
import buttonComponent from "../components/GenericComponents/Button.vue";
import router from "../router/index";

export default defineComponent({
  name: "Inspect",
  components: { configHover, buttonComponent },
  data() {
    return {
      workExperienceText: textConstants.WORK_EXPERIENCE,
      educationExperienceText: textConstants.EDUCATION_LEVEL,
      addressText: textConstants.ADDRESS,
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
      editText: textConstants.EDIT,
      backText: textConstants.BACK,
      editStyleText: valueConstants.STYLE_EDIT,
      nrText: textConstants.PHONE_NR_SPACE,
      emailText: textConstants.EMAIL_SPACE,
      maxOffsetHeight: 1123,
      paginationCount: 0,
    };
  },
  watch: {
    formData: {
      deep: true,
      handler() {
        this.calculateMaxOffsetHeight();
      },
    },
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
    calculateMaxOffsetHeight() {
      this.$nextTick(() => {
        const cvElement = this.$refs.displayedCV as HTMLElement;
        const difference = cvElement.scrollHeight / this.maxOffsetHeight;
        this.paginationCount = Math.floor(difference);
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
    this.calculateMaxOffsetHeight();
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
  $displayed-cv-div-not-first-child-margon-top: rem(20px);
  $displayed-cv-div-not-first-child-padding-bottom: rem(8px);
  .displayed-cv {
    position: relative;
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

    > div:not(:first-child) {
      width: 100%;
      margin-top: $displayed-cv-div-not-first-child-margon-top;
      padding-bottom: $displayed-cv-div-not-first-child-padding-bottom;
    }

    .base-data-block {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
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
      $work-data-element-min-height: rem(40px);
      .work-data-element {
        display: flex;
        position: relative;
        min-height: $work-data-element-min-height;
        div:nth-child(2) {
          display: flex;
          flex-direction: column;
          $work-position-element-margin-bottom: rem(5px);
          .work-position-element {
            width: fit-content;
            margin-bottom: $work-position-element-margin-bottom;
          }
          $work-place-element-div-first-child-margin-right: rem(5px);
          .work-place-element {
            display: flex;
            flex-direction: row;
            div {
              width: fit-content;
            }
            div:nth-child(1) {
              margin-right: $work-place-element-div-first-child-margin-right;
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
      $education-data-element-min-height: rem(40px);
      .education-data-element {
        display: flex;
        position: relative;
        min-height: $education-data-element-min-height;
        > .education-information-data {
          display: flex;
          flex-direction: column;
          width: 100%;
          .education-institution-data {
            flex-direction: column;
          }
          $study-field-data-div-not-last-child-margin-right: rem(5px);
          .study-field-data {
            display: flex;
            > div:not(:last-child) {
              margin-right: $study-field-data-div-not-last-child-margin-right;
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
      $address-data-element-min-height: rem(40px);
      .address-data-element {
        display: flex;
        flex-direction: column;
        position: relative;
        min-height: $address-data-element-min-height;
        .first-location-data-block {
          display: flex;
        }
        .second-location-data-block {
          display: flex;
          $street-name-margin-right: rem(10px);
          .street-name {
            margin-right: $street-name-margin-right;
          }
        }
      }
      .address-data-element:hover {
        .hoverDisplay {
          display: flex;
        }
      }
    }
    $custom-data-block-min-height: rem(40px);
    $custom-data-block-margin-bottom: rem(15px);
    .custom-data-block {
      position: relative;
      min-height: $custom-data-block-min-height;
      margin-bottom: $custom-data-block-margin-bottom;
    }
    .custom-data-block:hover {
      .hoverDisplay {
        display: flex;
      }
    }
    $date-field-width: rem(3cm);
    .date-field {
      width: $date-field-width;
    }
    $cv-section-title-text-border-width: rem(0px 0px 1px 0px);
    $cv-section-title-text-margin-bottom: rem(15px);
    .cv-section-title-text {
      border-style: solid;
      border-width: $cv-section-title-text-border-width;
      margin-bottom: $cv-section-title-text-margin-bottom;
    }
    .page-break {
      position: absolute;
      height: 1px;
      width: 100%;
      border-top: 2px dashed #000;
    }
  }

  $cv-inspect-button-block-width: rem(210mm);
  $cv-inspect-button-block-margin-top: rem(10px);
  .cv-inspect-button-block {
    display: flex;
    justify-content: space-between;
    width: $cv-inspect-button-block-width;
    margin-top: $cv-inspect-button-block-margin-top;
  }
}
</style>