<template>
  <div class="inspect-view-template">
    <div class="displayed-cv">
      <div class="base-data-block">
        <div class="cv-name-block cv-title-text">
          {{ formData.name }} {{ formData.surname }}
        </div>
        <div class="cv-contact-info-block">
          <div>
            {{ formData.phone_nr }}
          </div>
          <div>
            {{ formData.email }}
          </div>
        </div>
      </div>
      <div class="work-data-block">
        <div class="cv-section-title-text">
          {{ workExperienceText }}
        </div>
        <div
          class="work-data-element"
          v-for="workElement in formData.work"
          :key="workElement"
        >
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
      <div class="education-data-block">
        <div class="cv-section-title-text">
          {{ educationExperienceText }}
        </div>
        <div
          class="education-data-element"
          v-for="educationElement in formData.education"
          :key="educationElement"
        >
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
      <div class="address-data-block">
        <div class="cv-section-title-text">
          {{ addressText }}
        </div>
        <div
          class="address-data-element"
          v-for="addressElement in formData.address"
          :key="addressElement"
        >
          <div class="first-location-data-block medium-text-bold">
            <div>{{ addressElement.address_country }}</div>
            <div>, {{ addressElement.address_city }}</div>
            <div>, {{ addressElement.address_index }}</div>
          </div>
          <div class="second-location-data-block medium-text-bold">
            <div>{{ addressElement.address_street }}</div>
            <div>{{ addressElement.address_number }}</div>
          </div>
        </div>
      </div>
      <div
        class="custom-data-block"
        v-for="customElement in formData.custom"
        :key="customElement"
      >
        <div class="cv-section-title-text">
          {{ customElement.custom_name }}
        </div>
        <div class="small-text">
          {{ customElement.custom_value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" >
import { defineComponent } from "vue";
import store from "../store/mainStore";

export default defineComponent({
  name: "Inspect",
  components: {},
  data() {
    return {
      workExperienceText: "Darba pieredze", //const
      educationExperienceText: "Izglītība", //const
      addressText: "Adrese", //const
    };
  },
  computed: {
    formData() {
      return store.getters.getForm;
    },
  },
});
</script>
<style lang="scss" scoped>
@import "../assets/colors.scss";

.inspect-view-template {
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
      .cv-name-block {
      }
      .cv-contact-info-block {
        display: flex;
        flex-direction: column;
        margin-left: auto;
      }
    }

    .work-data-block {
      display: flex;
      flex-direction: column;
      .work-data-element {
        display: flex;
        div:nth-child(2) {
          display: flex;
          flex-direction: column;
          width: 100%;
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
    }
    .education-data-block {
      .education-data-element {
        display: flex;
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
    }
    .address-data-block {
      .address-data-element {
        display: flex;
        flex-direction: column;
        .first-location-data-block {
          display: flex;
        }
        .second-location-data-block {
          display: flex;
        }
      }
    }
    .custom-data-block {
      .custom-data-element {
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
}
</style>