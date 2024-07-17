// eventBus.ts
import { reactive } from 'vue';

type EventCallback = (...args: any[]) => void;

interface EventBus {
  events: any
  on(event: string, callback: EventCallback): void;
  emit(event: string, ...args: any[]): void;
}

const eventBus = reactive<EventBus>({
  events: {},
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  },

  emit(event, ...args) {
    if (!this.events[event]) return;
    this.events[event].forEach((callback: any) => callback(...args));
  },
});

export default eventBus;
