export function loadState<T>(key: string): T | undefined {
  try {
    const state = localStorage.getItem(key);
    if (!state) return undefined;
    return JSON.parse(state);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export function saveState<T>(key: string, state: T) {
  localStorage.setItem(key, JSON.stringify(state));
}
