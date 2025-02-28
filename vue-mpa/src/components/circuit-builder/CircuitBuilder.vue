<template>
  <div class="section page calculators">
    <div class="overlay shadow-overlay">
      <div class="container">
        <div class="title-container multiple-titles">
          <span class="title xl-title">Circuit Builder</span>
          <span class="mini-title">Drag Logic Gates</span>
        </div>
      </div>
    </div>
  </div>
  <div class="section logical-calculator-section">
    <div class="container">
      <div class="circuit-builder">
        <Sidebar />
        <div class="workspace-container">
          <div class="workspace" ref="workspace" @dragover.prevent @drop="dropElement">
            <LogicGate
              v-for="(gate, index) in gates"
              :key="index"
              :id="index"
              :type="gate.type"
              :position="gate.position"
              ref="gate"
              @move="updateGatePosition"
              @update-output="updateGateOutput"
            />

            <LEDOutput
              v-for="(led, index) in leds"
              :key="index"
              :id="index"
              :value="led.value"
              :position="led.position"
              :connectedTo="led.connectedTo"
              @move="updateLEDPosition"
              @connect="connectElements"
            />

            <SpeakerOutput
              v-for="(speaker, index) in speakers"
              :key="index"
              :id="index"
              :value="speaker.value"
              :position="speaker.position"
              @move="updateSpeakerPosition"
            />

            <WireElement
              v-for="(wire, index) in wires"
              :key="index"
              :id="index"
              :start="wire.start"
              :end="wire.end"
              :startId="wire.startId"
              :endId="wire.endId"
              @update-wire="updateWire"
              @connect-elements="connectElements"
            />
          </div>
          <button class="compute-btn" @click="computeOutput">Compute Output</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "./Sidebar.vue";
import LogicGate from "./LogicGate.vue";
import LEDOutput from "./LEDOutput.vue";
import SpeakerOutput from "./SpeakerOutput.vue";
import WireElement from "./WireElement.vue";

export default {
  components: { Sidebar, LogicGate, LEDOutput, SpeakerOutput, WireElement },
  data() {
    return {
      gates: [],
      leds: [],
      speakers: [],
      wires: [],
    };
  },
  methods: {
    dropElement(event) {
      const workspace = this.$refs.workspace.getBoundingClientRect();
      const x = event.clientX - workspace.left;
      const y = event.clientY - workspace.top;
      const type = event.dataTransfer.getData("type");
      const elementType = event.dataTransfer.getData("elementType");

      if (x >= 0 && y >= 0 && x <= workspace.width && y <= workspace.height) {
        if (elementType === "gate") {
          this.gates.push({ id: this.gates.length, type, position: { x, y }, input1: null, input2: null, output: 0 });
        } else if (elementType === "led") {
          this.leds.push({ id: this.leds.length, position: { x, y }, value: 0, connectedTo: null });
        } else if (elementType === "speaker") {
          this.speakers.push({ id: this.speakers.length, position: { x, y }, value: 0, connectedTo: null });
        } else if (elementType === "wire") {
          this.wires.push({ id: this.wires.length, start: { x, y }, end: { x: x + 50, y }, startId: null, endId: null });
        }
      }
    },

    computeOutput() {
  console.log("🔵 Starting Computation...");

  // Step 1: Compute all gate outputs
  this.gates.forEach(gate => {
    this.$refs.gate[gate.id]?.computeOutput();
    console.log(`✅ Gate ${gate.id} computed output: ${gate.output}`);
  });

  // Step 2: Transmit Values via Wires
  this.wires.forEach(wire => {
    const sourceGate = this.gates.find(gate => gate.id === wire.startId);
    const targetLED = this.leds.find(led => led.id === wire.endId);

    if (sourceGate) {
      console.log(`📡 Wire ${wire.id} transmitting ${sourceGate.output} from Gate ${sourceGate.id}`);

      // ✅ Ensure Vue Reactivity
      this.leds = this.leds.map(led => 
        led.id === targetLED?.id
          ? { ...led, value: sourceGate.output }
          : led
      );

      if (targetLED) {
        console.log(`💡 LED ${targetLED.id} set to ${targetLED.value}`);
      }
    }
  });

  this.$forceUpdate(); // Force Vue to detect changes
}
,

connectElements(sourceId, targetId) {
  console.log(`✅ Attempting to connect ${sourceId} → ${targetId}`);

  if (typeof targetId === "string" && targetId.startsWith("led-")) {
    targetId = parseInt(targetId.replace("led-", ""), 10);
  }

  const sourceGate = this.gates.find(g => g.id === sourceId);
  const targetGate = this.gates.find(g => g.id === targetId);
  const targetLED = this.leds.find(led => led.id === targetId);
  let wire = this.wires.find(w => w.startId === sourceId && w.endId === targetId);

  if (!sourceGate) {
    console.error(`🚨 Source Gate ${sourceId} Not Found!`);
    return;
  }

  if (!targetGate && !targetLED) {
    console.error(`🚨 Target Component ${targetId} Not Found!`);
    return;
  }

  if (!wire) {
    console.warn(`⚠️ No Wire Found Between ${sourceId} → ${targetId}. Creating one.`);
    wire = { id: this.wires.length + 1, startId: sourceId, endId: targetId };
    this.wires.push(wire);
  }

  console.log(`🔗 Wire Confirmed Between ${wire.startId} → ${wire.endId}`);

  // ✅ Gate-to-Gate Connection Handling
  if (targetGate) {
    console.log(`🔗 Connecting Gate ${sourceId} Output → Gate ${targetId} Input`);

    if (targetGate.input1 === null) {
      targetGate.input1 = sourceGate.output;
      console.log(`🛠 Gate ${targetId} Input1 updated to ${sourceGate.output}`);
    } else if (targetGate.input2 === null) {
      targetGate.input2 = sourceGate.output;
      console.log(`🛠 Gate ${targetId} Input2 updated to ${sourceGate.output}`);
    } else {
      console.warn(`⚠️ Gate ${targetId} Already Has Two Inputs!`);
    }

    // Ensure Vue detects the change
    this.gates = [...this.gates];

    // **Trigger Computation Again to Update Chain**
    this.$nextTick(() => {
      console.log(`🔄 Gate ${targetId} Now Computing With Updated Inputs`);

      // ✅ Process logic correctly after inputs are updated
      if (targetGate.type === "AND") {
        targetGate.output = targetGate.input1 && targetGate.input2;
      } else if (targetGate.type === "OR") {
        targetGate.output = targetGate.input1 || targetGate.input2;
      } else if (targetGate.type === "NOT") {
        targetGate.output = !targetGate.input1;
      }

      console.log(`🟢 Gate ${targetId} Computed Output: ${targetGate.output}`);

      // ✅ If this gate is connected to an LED, update the LED immediately
      const connectedLED = this.leds.find(led => led.connectedTo === targetGate.id);
      if (connectedLED) {
        connectedLED.value = targetGate.output;
        console.log(`💡 LED ${connectedLED.id} updated to ${connectedLED.value}`);
      }

      this.computeOutput();
    });
  }

  // ✅ Gate-to-LED Connection Handling (Preserved)
  if (targetLED) {
    targetLED.connectedTo = sourceGate.id;
    targetLED.value = sourceGate.output;
    console.log(`💡 LED ${targetLED.id} now connected to Gate ${sourceGate.id} → Status: ${sourceGate.output}`);

    this.leds = [...this.leds];
    console.log(`📡 Updated LEDs:`, this.leds);
  }
},






    updateGateOutput(id, output) {
      const gate = this.gates.find(gate => gate.id === id);
      if (gate) {
        gate.output = output;
        console.log(`Gate ${id} output updated to: ${output}`);
      }
    },

    updateWire(id, newWire) {
      this.wires[id] = newWire;
    },

    updateLEDPosition(id, position) {
      const led = this.leds.find(led => led.id === id);
      if (led) {
        led.position = position;
      }
    },

    updateGatePosition(id, position) {
      const gate = this.gates.find(gate => gate.id === id);
      if (gate) {
        gate.position = position;
      }
    },

    updateSpeakerPosition(id, position) {
      const speaker = this.speakers.find(speaker => speaker.id === id);
      if (speaker) {
        speaker.position = position;
      }
    }
  }

};
</script>

<style>
.circuit-builder {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.sidebar {
  width: 20%;
}
.workspace-container {
  width: 70%;
  margin-left: 20px;
}
.workspace {
  position: relative;
  width: 100%;
  height: 500px;
  border: 1px solid black;
  overflow: hidden;
  margin-bottom: 20px;
}
.compute-btn {
  padding: 10px 20px;
  font-size: 16px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease;
  display: block;
  margin: 10px auto 0;
  text-align: center;
}
.compute-btn:hover {
  background: #0056b3;
}
</style>
