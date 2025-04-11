const KEY_MAP: Record<string, string> = {
  Space: "space",
  ArrowLeft: "left",
  ArrowRight: "right",
};

type KeyState = {
  pressed: boolean;
  timestamp: number;
};

type KeyMap = {
  left: KeyState;
  right: KeyState;
  space: KeyState;
};

export class PlayerController {
  keys: KeyMap = {
    left: { pressed: false, timestamp: 0 },
    right: { pressed: false, timestamp: 0 },
    space: { pressed: false, timestamp: 0 },
  };

  constructor() {
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
  }

  onKeyDown = (event: KeyboardEvent) => {
    if (!(event.code in KEY_MAP)) {
      return;
    }

    const key = KEY_MAP[event.code] as keyof KeyMap;
    this.keys[key].pressed = true;
    this.keys[key].timestamp = Date.now();
  };

  onKeyUp = (event: KeyboardEvent) => {
    if (!(event.code in KEY_MAP)) {
      return;
    }

    const key = KEY_MAP[event.code] as keyof KeyMap;
    this.keys[key].pressed = false;
    this.keys[key].timestamp = 0;
  };
}
