<template>
  <svg :class="svgClass" :style="{ 'font-size': size, color: color }">
    <use :xlink:href="iconName"/>
  </svg>
</template>

<script setup>
import {defineProps, computed} from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: '14px',
  },
})
const iconName = computed(() => {
  return `#icon-${props.name}`
})
const svgClass = computed(() => {
  if (props.name) {
    return `svg-icon icon-${props.name}`;
  }
  return `svg-icon`;
})
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}
</style>