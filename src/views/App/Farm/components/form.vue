<template>
  <form class>
    <div class="position-relative form-group">
      <!-- <label for="name" class="">Nome</label> -->
      <input
        type="name"
        name="name"
        id="name"
        :class="{ 'input-has-error': $v.model.name.$error }"
        @change="$v.model.name.$touch()"
        v-model="model.name"
        placeholder="Nome da fazenda"
        class="form-control"
      />
    </div>
    <div class="position-relative form-group">
      <!-- <label for="address" class="">Endereço da fazenda</label> -->
      <input
        type="text"
        name="address"
        id="address"
        :class="{ 'input-has-error': $v.model.address.$error }"
        @change="$v.model.address.$touch()"
        v-model="model.address"
        placeholder="Endereço da fazenda"
        class="form-control"
      />
    </div>
    <div class="position-relative form-group">
      <!-- <label for="address" class="">Endereço de cobranca</label> -->
      <input
        type="text"
        name="billing_address"
        id="billing_address"
        :class="{ 'input-has-error': $v.model.billing_address.$error }"
        @change="$v.model.billing_address.$touch()"
        v-model="model.billing_address"
        placeholder="Endereço de cobrança"
        class="form-control"
      />
    </div>
    <div class="form-row">
      <div class="col-md-2">
        <div class="position-relative form-group">
          <!-- <label for="state_registration" class="">Estado</label> -->
          <input
            type="text"
            name="state_registration"
            id="state_registration"
            :class="{ 'input-has-error': $v.model.state_registration.$error }"
            @change="$v.model.state_registration.$touch()"
            v-model="model.state_registration"
            placeholder="Estado"
            class="form-control"
          />
        </div>
      </div>
      <div class="col-md-5">
        <div class="position-relative form-group">
          <!-- <label for="production_area" class="">Area de produção</label> -->
          <input
            type="text"
            name="production_area"
            id="production_area"
            :class="{ 'input-has-error': $v.model.production_area.$error }"
            @change="$v.model.production_area.$touch()"
            v-model="model.production_area"
            placeholder="Área de produção"
            class="form-control"
          />
        </div>
      </div>
      <div class="col-md-5">
        <div class="position-relative form-group">
          <!-- <label for="production_type" class="">Tipo de produção</label> -->
          <input
            type="text"
            name="production_type"
            id="production_type"
            :class="{ 'input-has-error': $v.model.production_type.$error }"
            @change="$v.model.production_type.$touch()"
            v-model="model.production_type"
            placeholder="Tipo de produção"
            class="form-control"
          />
        </div>
      </div>
    </div>
    <slot></slot>
  </form>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  name: "Form",
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      model: { ...this.form }
    };
  },
  methods: {
    submit() {
      this.$v.$touch();
      return new Promise((resolve, reject) => {
        if (this.$v.$invalid) {
          reject("Error: Invalid Form!");
        }
        return resolve({ ...this.model });
      });
    },
    handleReset() {
      this.$v.$reset();
      this.$emit("reset");
    }
  },
  validations: {
    model: {
      name: {
        required,
        minLength: minLength(6)
      },
      address: {
        required
      },
      state_registration: {
        required
      },
      billing_address: {
        required
      },
      production_area: {
        required
      },
      production_type: {
        required
      }
    }
  },
  watch: {
    form(val) {
      this.model = { ...val };
    }
  }
};
</script>