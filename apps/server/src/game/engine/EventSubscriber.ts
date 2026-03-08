import { Events } from "@engine/GameEvent.js";

// GameObjects are EventSubscribers
type EventSubscriber = {
  [K in keyof Events as `on${Capitalize<K>}`]?: (event: Events[K]) => void;
};

const test = {
  onCardPlayed({ name }) {
    console.log("Card played:", name);
  },
} satisfies EventSubscriber;
