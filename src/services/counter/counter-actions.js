export const COUNTER_CHANGE = 'COUNTER_CHANGE';

const getIncrementedCounter = async (id, counter, num) => {
  let counterObj = {};
  const keys = Object.keys(counter);
  if (keys.length > 0 && counter) {
    for (let key of keys) {
      (key === id)
        ? counterObj = { ...counterObj, [key]: counter[key] + num }
        : counterObj = { ...counterObj, [key]: counter[key] }
    }
  }
  return counterObj;
};


const getDecrementedCounter = async (id, counter, num) => {
  let counterObj = {};
  const keys = Object.keys(counter);
  if (keys.length > 0 && counter) {
    for (let key of keys) {
      (key === id)
        ? counterObj = { ...counterObj, [key]: counter[key] - num }
        : counterObj = { ...counterObj, [key]: counter[key] }
    }
  }
  return counterObj;
};


const getIncrAndDecrCounter = async (addCountId, reduceCountId, counter, num) => {
  let counterObj = {};
  const keys = Object.keys(counter);
  if (keys.length > 0 && counter) {
    for (let key of keys) {
      if (key === addCountId) {
        counterObj = { ...counterObj, [key]: counter[key] + num }
      }
      else if (key === reduceCountId) {
        counterObj = { ...counterObj, [key]: counter[key] - num }
      }
      else {
        counterObj = { ...counterObj, [key]: counter[key] }
      }
    }
  };
  return counterObj;
};

const getResetCounter = async (counter) => {
  let counterObj = {};
  const keys = Object.keys(counter);
  if (keys.length > 0 && counter) {
    for (let key of keys) {
      counterObj = { ...counterObj, [key]: 0 }
    }
  };
  return counterObj;
};


export function addCount(id, counter, num) {
  return async function (dispatch) {
    const counterObj = await getIncrementedCounter(id, counter, num);
    dispatch({ type: COUNTER_CHANGE, payload: counterObj });
  };
};


export function reduceCount(id, counter, num) {
  return async function (dispatch) {
    const counterObj = await getDecrementedCounter(id, counter, num);
    dispatch({ type: COUNTER_CHANGE, payload: counterObj });
  };
};


export function addAndReduceCount(addCountId, reduceCountId, counter, num) {
  return async function (dispatch) {
    const counterObj = await getIncrAndDecrCounter(addCountId, reduceCountId, counter, num);
    dispatch({ type: COUNTER_CHANGE, payload: counterObj });
  };
};


export function resetCount(counter) {
  return async function (dispatch) {
    const counterObj = await getResetCounter(counter);
    dispatch({ type: COUNTER_CHANGE, payload: counterObj });
  };
};
