import {loadState, saveState} from '../../src/App/LocalStorage';

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value;
  }
}

global.localStorage = new LocalStorageMock;

describe('loadState', () => {
  it('should return undefined by default', () => {
    expect(loadState()).toBeUndefined();
  });

  it('should return stored value', () => {
    const value = ['1','2','3'];
    localStorage.setItem('state',JSON.stringify(value));
    expect(loadState()).toEqual(value);
    localStorage.clear();
  });

  it('should throw error', () => {
    localStorage.setItem('state',undefined);
    expect(loadState()).toThrow();
    localStorage.clear();
  });
});

describe('saveState', () => {
  it('should save value', () => {
    const value = ['1','2','3'];
    saveState(value);
    expect(localStorage.getItem('state')).toEqual(JSON.stringify(value));
    localStorage.clear();
  });
});
