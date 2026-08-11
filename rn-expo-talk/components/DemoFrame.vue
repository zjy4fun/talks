<script setup>
// 把 public/demos/ 下的独立演示页嵌进幻灯片。
// 这些 HTML 文件本身是自包含的，双击也能在浏览器里直接打开演示。
const props = defineProps({
  src: { type: String, required: true },
  height: { type: Number, default: 340 },
})
const base = import.meta.env.BASE_URL
</script>

<template>
  <iframe
    class="demo-frame"
    :src="`${base}demos/${props.src}`"
    :style="{ height: `${props.height}px` }"
  />
</template>

<style scoped>
.demo-frame {
  display: block;
  width: 100%;
  margin-top: 0.6rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: #faf9f7;
}
</style>
