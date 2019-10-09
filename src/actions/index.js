export const HANDLE_CLICK = "HANDLE_CLICK";
export const CLICK_LIST = "CLICK_LIST";
export const RESET_GAME = "RESET_GAME";
export const REVERSE_ARRAY = "REVERSE_ARRAY";

export function handleClick(i) {
  return { type: HANDLE_CLICK, i };
}

export function clickList(i) {
  return { type: CLICK_LIST, i };
}

export function resetGame() {
  return { type: RESET_GAME };
}

export function reverseArray() {
  return { type: REVERSE_ARRAY };
}

