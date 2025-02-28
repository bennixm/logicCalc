<template>
  <div
    class="speaker"
    :style="{ left: position.x + 'px', top: position.y + 'px' }"
    draggable="true"
    @dragstart="startDrag"
    @dragend="moveElement"
  >
    <img :src="require('@/images/speaker.svg')" alt="Speaker" />
  </div>
</template>

<script>
export default {
  props: ["id", "value", "position"],
  methods: {
    startDrag(event) {
      event.dataTransfer.setData("elementId", this.id);
      event.dataTransfer.setData("elementType", "speaker");
    },
    moveElement(event) {
      this.$emit("move", this.id, { x: event.clientX, y: event.clientY });
    },
  },
};
</script>

<style>
.circuit-builder .speaker {
  position: absolute;
  width: 50px;
}
</style>
