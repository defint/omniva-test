export const loadState = () => {
  try {
    const state = localStorage.getItem('state');
    if(state === null) {
      return undefined;
    }
    return JSON.parse(state);
  }
  catch (err) {
    return undefined;
  }
};

export const saveState = (stateNew) => {
  try {
    const stateNewStringify = JSON.stringify(stateNew);
    localStorage.setItem('state',stateNewStringify);
  }
  catch (err) {
    // Don't write to storage.
  }
};