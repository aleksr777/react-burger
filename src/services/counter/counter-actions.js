export const COUNTER_INCREMENT = 'COUNTER_INCREMENT';
export const COUNTER_DECREMENT = 'COUNTER_DECREMENT';

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


export function addCount(id, counter, num) {
  return async function (dispatch) {
    const counterObj = await getIncrementedCounter(id, counter, num);
    dispatch({ type: COUNTER_INCREMENT, payload: counterObj });
  };
};


export function reduceCount(id, counter, num) {
  return async function (dispatch) {
    const counterObj = await getDecrementedCounter(id, counter, num);
    dispatch({ type: COUNTER_DECREMENT, payload: counterObj });
  };
};


export function addAndReduceCount(addCountId, reduceCountId, counter, num) {
  return async function (dispatch) {
    const counterObj = await getIncrAndDecrCounter(addCountId, reduceCountId, counter, num);
    dispatch({ type: COUNTER_DECREMENT, payload: counterObj });
  };
};
