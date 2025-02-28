<template>
  <div class="sidebar">
    <h2>Components</h2>
    
    <div class="table">
      <div class="table-row">
        <h3>Logic Gates</h3>
        <div class="item-grid">
          <div
            v-for="type in gateTypes"
            :key="type"
            class="gate-item"
            draggable="true"
            @dragstart="startDrag($event, type, 'gate')"
          >
            <img :src="getImagePath(type)" :alt="type" />
            <p>{{ type }}</p>
          </div>
        </div>
      </div>

      <div class="table-row">
        <h3>Outputs</h3>
        <div class="item-grid">
          <div class="output-item" draggable="true" @dragstart="startDrag($event, 'LED', 'led')">
            <img :src="require('@/images/led-off.svg')" alt="LED" />
            <p>LED</p>
          </div>
          <div class="output-item" draggable="true" @dragstart="startDrag($event, 'Speaker', 'speaker')">
            <img :src="require('@/images/speaker.svg')" alt="Speaker" />
            <p>Speaker</p>
          </div>
        </div>
      </div>

      <div class="table-row">
        <h3>Wire Tool</h3>
        <div class="item-grid">
          <div class="wire-item" draggable="true" @dragstart="startDrag($event, 'wire', 'wire')">
            <img :src="require('@/images/wire.svg')" alt="Wire" />
            <p>Wire</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gateTypes: ["AND", "OR", "NOT", "XOR", "NAND", "NOR", "XNOR"],
    };
  },
  methods: {
    getImagePath(type) {
      return require(`@/images/${type.toLowerCase()}.svg`);
    },
    startDrag(event, type, elementType) {
      event.dataTransfer.setData("type", type);
      event.dataTransfer.setData("elementType", elementType);
    },
  },
};
</script>

<style>
.circuit-builder .sidebar {
  width: 250px; /* Reduced width */
  box-shadow: 0 0 20px #d9dfee;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  border-right: 2px solid #ddd;
}

.circuit-builder h2 {
  text-align: center;
  margin-bottom: 10px;
}

.circuit-builder .table {
  display: flex;
  flex-direction: column;
}

.circuit-builder .table-row {
  margin-bottom: 15px;
}

.circuit-builder h3 {
  text-align: center;
  color: #333;
  margin-bottom: 5px;
}

.circuit-builder .item-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Adjusted columns */
  gap: 10px;
  justify-items: center;
}

.circuit-builder .gate-item, .output-item, .wire-item {
  width: 60px; /* Reduced width */
  text-align: center;
  cursor: grab;
  padding: 5px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: transform 0.2s;
}

.circuit-builder .gate-item:hover, .output-item:hover, .wire-item:hover {
  transform: scale(1.1);
}

.circuit-builder .gate-item img, .output-item img, .wire-item img {
  width: 35px; /* Reduced size */
  height: 35px; /* Reduced size */
}

.circuit-builder p {
  font-size: 12px;
  margin-top: 5px;
}
</style>
