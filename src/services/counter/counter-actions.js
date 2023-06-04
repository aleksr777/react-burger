export const COUNTER_INCREMENT = 'COUNTER_INCREMENT';
export const COUNTER_DECREMENT = 'COUNTER_DECREMENT';

const getIncrementedCounterObj = async (id, counter, num) => {
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


const getDecrementedCounterObj = async (id, counter, num) => {
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


export function addCount(id, counter, num) {
  return async function (dispatch) {
    const counterObj = await getIncrementedCounterObj(id, counter, num);
    dispatch({ type: COUNTER_INCREMENT, payload: counterObj });
  };
}

export function reduceCount(id, counter, num) {
  return async function (dispatch) {
    const counterObj = await getDecrementedCounterObj(id, counter, num);
    dispatch({ type: COUNTER_DECREMENT, payload: counterObj });
  };
}

export function addAndReduceCount(addCountId, reduceCountId, counter, num) {
  return async function (dispatch) {
    const incrementedCounterObj = await getIncrementedCounterObj(addCountId, counter, num);
    const counterObj = await getDecrementedCounterObj(reduceCountId, incrementedCounterObj, num);
    dispatch({ type: COUNTER_DECREMENT, payload: counterObj });
  };
}
