<template>
  <div :class="['uploader_image', { loading }]" @click="$refs.input.click()">
    <input ref="input" :accept="extensions" type="file" @change="upload">
    <div v-if="value" class="uploader_image--preview">
      <div class="uploader_image--control" @click.stop="$emit('input', '')">
        <kit-icon :ripple="false" color="light" size="compact">
          close
        </kit-icon>
      </div>
      <div class="uploader_image--image">
        <img :src="value" alt="image" @load="loading = false;">
        <kit-spinner v-if="loading"/>
        <div v-else class="uploader_image--hint">
          <kit-icon :ripple="false" size="large">
            cloud_upload
          </kit-icon>
        </div>
      </div>
    </div>
    <div v-else class="uploader_image--placeholder">
      <kit-spinner v-if="loading" size="compact"/>
      <kit-icon v-else :ripple="false" size="large">
        cloud_upload
      </kit-icon>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'KitImageUploader',
  props: {
    value: { type: String, default: '' },
    vuelidate: { type: Object, default: () => ({}) },
    rounded: { type: Boolean, default: false },
    extensions: { type: String, default: '.jpeg, .jpg' },
    size: { type: Number, default: 10000000 },
    transform: { type: String, default: 'square' }
  },
  data: () => ({
    loading: false
  }),
  methods: {
    async upload({ target }) {
      try {
        this.$emit('input', '');
        const [file] = target.files;
        if (!this.valid(file)) {
          console.log('Extension error');
        } else if (file.size > this.size) {
          console.log('Size error');
        } else {
          this.loading = true;
          const { key, url, bucket } = await this.$api.upload.image();
          await axios.put(url, file, { headers: { 'Content-Type': file.type } });
          this.$emit('input', `${bucket}${key}`);
        }
      } catch (err) {
        console.log(err);
      } finally {
        target.value = '';
      }
    },
    valid(file) {
      return file.type.startsWith('image/')
        && this.extensions.split(', ').some(extension => file.name.toLowerCase().endsWith(extension));
    }
  }
};
</script>

<style lang="scss" scoped>
.uploader_image {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: $light;
  cursor: pointer;
  overflow: hidden;

  input {
    display: none;
  }

  &--preview {
    width: inherit;
    height: inherit;
  }

  &--image {
    position: relative;
    width: inherit;
    height: inherit;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
      transition: filter .3s ease-out;

      .loading & {
        filter: blur(5px);
      }
    }

    &:hover img {
      filter: blur(5px);
    }
  }

  &--image:hover &--hint {
    opacity: 1;
  }

  &--hint {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: $light;
    background-color: rgba($main, .6);
    opacity: 0;
    transition: opacity .3s ease-out;
    pointer-events: none;
  }

  &--control {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 5px;
    right: 5px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: $main;
    z-index: 1;
  }

  &--placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
  }
}
</style>
