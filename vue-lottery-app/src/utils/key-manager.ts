import { onMounted, onUnmounted } from 'vue';

type KeyHandler = (event: KeyboardEvent) => void;

export class KeyManager {
  private handlers: Map<string, Set<KeyHandler>>;

  constructor() {
    this.handlers = new Map();
  }

  addHandler(key: string, handler: KeyHandler): void {
    if (!this.handlers.has(key)) {
      this.handlers.set(key, new Set());
    }
    this.handlers.get(key)!.add(handler);
  }

  removeHandler(key: string, handler: KeyHandler): void {
    const handlers = this.handlers.get(key);
    if (handlers) {
      handlers.delete(handler);
      if (handlers.size === 0) {
        this.handlers.delete(key);
      }
    }
  }

  private handleKeyDown = (event: KeyboardEvent): void => {
    const handlers = this.handlers.get(event.key);
    if (handlers) {
      handlers.forEach(handler => handler(event));
    }
  }

  mount(): void {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  unmount(): void {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  useKeyManager(): void {
    onMounted(() => this.mount());
    onUnmounted(() => this.unmount());
  }
}

export const globalKeyManager = new KeyManager();