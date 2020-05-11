<template>
  <div class="select">
    <multiselect
      :value="value"
      :options="options.map(option => option.id)"
      :custom-label="value => options.find(item => item.id === value).name"
      :searchable="false"
      :show-labels="false"
      :placeholder="placeholder"
      @close="touch"
      @select="select"
    >
      <template slot="option" slot-scope="props">
        {{ label(props.option) }}
      </template>
    </multiselect>
    <div class="select--additional">
      <kit-tooltip v-if="invalid" :content="error" type="warning">
        <kit-icon size="compact" class="select--alert">
          error
        </kit-icon>
      </kit-tooltip>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';

export default {
  name: 'KitSelect',
  components: { Multiselect },
  props: {
    value: { type: [String, Number, Object], default: null },
    vuelidate: { type: Object, default: null },
    options: { type: Array, default: () => [] },
    size: {
      type: String,
      default: 'regular',
      validator: size => ['compact', 'regular', 'large'].includes(size)
    },
    placeholder: { type: String, default: '' },
  },
  computed: {
    invalid() {
      return Boolean(this.vuelidate && this.vuelidate.$error);
    },
    error() {
      if (this.invalid) {
        const { params } = this.vuelidate.$flattenParams().find(({ name }) => !this.vuelidate[name]);
        return params && params.message;
      } else {
        return '';
      }
    }
  },
  methods: {
    label(value) {
      return this.options.find(item => item.id === value).name;
    },
    select(value) {
      this.$emit('input', value);
    },
    touch() {
      if (!this._isDestroyed && this.vuelidate) {
        this.vuelidate.$touch();
      }
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
.multiselect {
  height: 44px;
  font-size: 14px;
  color: $text;

  &__input {
    font-size: 14px;
  }

  &__single {
    padding: 0;
    font-size: 14px;
  }

  &__select {
    height: 100%;

    &:before {
      top: 58%;
    }
  }

  &__tags {
    height: 100%;
    padding-top: 11px;
    border-color: #cfdbdf;
  }

  &__placeholder {
    color: $info;
  }

  &__option {
    &--highlight {
      background: $main;
      color: $light;
    }

    &--selected {
      &.multiselect__option--highlight {
        background: $main;
        color: $light;
      }
    }
  }
}

.select {
  position: relative;

  &--additional {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    padding: 5px;
    height: 100%;
    box-sizing: border-box;
    z-index: 2;
  }

  &--alert {
    color: $warning;
    cursor: pointer;
    background: white;
  }
}
</style>
