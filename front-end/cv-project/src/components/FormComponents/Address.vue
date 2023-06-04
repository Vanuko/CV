<template>
  <div class="address-component-template">
    <div v-if="addressValues">
      <div>
        <form-text :titleText="countryText" />
        <input-field
          :value="addressValues.address_country"
          @input="handleInput($event, countryText)"
        />
      </div>
      <div>
        <form-text :titleText="indexText" />
        <input-field
          :value="addressValues.address_index"
          @input="handleInput($event, indexText)"
        />
      </div>
      <div>
        <form-text :titleText="cityText" />
        <input-field
          :value="addressValues.address_city"
          @input="handleInput($event, cityText)"
        />
      </div>
      <div>
        <form-text :titleText="streetText" />
        <input-field
          :value="addressValues.address_street"
          @input="handleInput($event, streetText)"
        />
      </div>
      <div>
        <form-text :titleText="streetNumbetText" />
        <input-field
          :value="addressValues.address_number"
          @input="handleInput($event, streetNumbetText)"
        />
      </div>
    </div>
    <button-component
      :buttonStyle="createStyleText"
      :buttonText="addMoreText"
      @click="addAddress()"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormText from "./FormText.vue";
import inputField from "../GenericComponents/InputField.vue";
import * as textConstants from "../../constants/TextConstants";
import * as keyNames from "../../constants/KeyNameConstants";
import * as valueConstants from "../../constants/ValueConstants";
import store from "../../store/mainStore";
import buttonComponent from "../GenericComponents/Button.vue";
import { mapState } from "vuex";
import { AddressInterface } from "../../models/form";

export default defineComponent({
  name: "AddressComponent",
  components: { FormText, inputField, buttonComponent },
  data() {
    return {
      countryText: textConstants.COUNTRY,
      indexText: textConstants.INDEX,
      cityText: textConstants.CITY,
      streetText: textConstants.STREET,
      streetNumbetText: textConstants.STREET_NUMBER,
      uuid: 0,
      createStyleText: valueConstants.STYLE_CREATE,
      addMoreText: textConstants.ADD,
    };
  },
  methods: {
    handleInput(inputData: string, data: string) {
      const lastUid = store.getters.getLastUid;
      switch (data) {
        case textConstants.COUNTRY: {
          store.dispatch("updateFormPart", {
            part: keyNames.AD_COUNTRY,
            value: inputData,
            arrayKeyName: keyNames.ADDRESS,
            uuid: lastUid.last_address_ID,
          });
          break;
        }
      }
      switch (data) {
        case textConstants.INDEX: {
          store.dispatch("updateFormPart", {
            part: keyNames.AD_INDEX,
            value: inputData,
            arrayKeyName: keyNames.ADDRESS,
            uuid: lastUid.last_address_ID,
          });
          break;
        }
      }
      switch (data) {
        case textConstants.CITY: {
          store.dispatch("updateFormPart", {
            part: keyNames.AD_CITY,
            value: inputData,
            arrayKeyName: keyNames.ADDRESS,
            uuid: lastUid.last_address_ID,
          });
          break;
        }
      }
      switch (data) {
        case textConstants.STREET: {
          store.dispatch("updateFormPart", {
            part: keyNames.AD_STREET,
            value: inputData,
            arrayKeyName: keyNames.ADDRESS,
            uuid: lastUid.last_address_ID,
          });
          break;
        }
      }
      switch (data) {
        case textConstants.STREET_NUMBER: {
          store.dispatch("updateFormPart", {
            part: keyNames.AD_NR,
            value: inputData,
            arrayKeyName: keyNames.ADDRESS,
            uuid: lastUid.last_address_ID,
          });
          break;
        }
      }
    },
    addAddress() {
      const latstUidObject = store.state.formStore.lastUid;
      this.uuid = latstUidObject.last_address_ID + Math.floor(Math.random() * (9999 - 99 + 1)) + 99;
      const addressData = {
        arrayKeyName: keyNames.ADDRESS,
        object: {
          ID: this.uuid,
          address_country: null,
          address_index: null,
          address_city: null,
          address_street: null,
          address_number: null,
        },
      };
      store.dispatch("attachObject", addressData);
      store.dispatch("changeLastUid", {
        part: keyNames.LAST_ADDRESS,
        uuid: this.uuid,
      });
    },
  },
  computed: {
    ...mapState({
      addressValues: (state: any) => {
        const formObject = state.formStore.cvObject;
        const latstUidObject = state.formStore.lastUid;
        const addressObject = formObject.address.find(
          (address: AddressInterface) =>
            address.ID === latstUidObject.last_address_ID
        );
        return addressObject;
      },
    }),
  },
});
</script>
<style lang="scss" scoped>
@import "../../assets/colors.scss";
$example: rem(800px);
.address-component-template {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  > div:nth-child(1) {
    div {
      display: flex;
      flex-direction: column;
    }
  }
  > div:nth-child(2) {
    margin-top: 5px;
  }
}
</style>