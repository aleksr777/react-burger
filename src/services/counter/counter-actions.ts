import { CounterStateType } from '../../types/counter-types';
import { DispatchFuncType, CounterType } from '../../types/types';

export const COUNTER_CHANGE = 'COUNTER_CHANGE';

const getIncrementedCounter = async (
  id: string,
  counter: CounterType,
  num: number
): Promise<CounterStateType | {}> => {
  let counterObj: CounterStateType | {} = {};
  const keys = Object.keys(counter);
  if (keys.length > 0 && counter) {
    for (let key of keys) {
      key === id
        ? (counterObj = { ...counterObj, [key]: (counter[key] as number) + num })
        : (counterObj = { ...counterObj, [key]: counter[key] });
    }
  }
  return counterObj;
};

const getDecrementedCounter = async (
  id: string,
  counter: CounterType,
  num: number
): Promise<CounterStateType | {}> => {
  let counterObj: CounterStateType | {} = {};
  const keys: string[] = Object.keys(counter);
  if (keys.length > 0 && counter) {
    for (let key of keys) {
      key === id
        ? (counterObj = { ...counterObj, [key]: (counter[key] as number) - num })
        : (counterObj = { ...counterObj, [key]: counter[key] });
    }
  }
  return counterObj;
};

const getIncrAndDecrCounter = async (
  addCountId: string,
  reduceCountId: string,
  counter: CounterType,
  num: number
): Promise<CounterStateType | {}> => {
  let counterObj: CounterStateType | {} = {};
  const keys = Object.keys(counter);
  if (keys.length > 0 && counter) {
    for (let key of keys) {
      if (key === addCountId) {
        counterObj = { ...counterObj, [key]: (counter[key] as number) + num };
      } else if (key === reduceCountId) {
        counterObj = { ...counterObj, [key]: (counter[key] as number) - num };
      } else {
        counterObj = { ...counterObj, [key]: counter[key] };
      }
    }
  }
  return counterObj;
};

const getResetCounter = async (counter: CounterType): Promise<CounterStateType | {}> => {
  let counterObj: CounterStateType | {} = {};
  const keys = Object.keys(counter);
  if (keys.length > 0 && counter) {
    for (let key of keys) {
      counterObj = { ...counterObj, [key]: 0 };
    }
  }
  return counterObj;
};

export function addCount(id: string, counter: CounterType, num: number): DispatchFuncType {
  return async function (dispatch) {
    const counterObj = await getIncrementedCounter(id, counter, num);
    dispatch({ type: COUNTER_CHANGE, payload: counterObj });
  };
}

export function reduceCount(id: string, counter: CounterType, num: number): DispatchFuncType {
  return async function (dispatch) {
    const counterObj = await getDecrementedCounter(id, counter, num);
    dispatch({ type: COUNTER_CHANGE, payload: counterObj });
  };
}

export function addAndReduceCount(
  addCountId: string,
  reduceCountId: string,
  counter: CounterType,
  num: number
): DispatchFuncType {
  return async function (dispatch) {
    const counterObj = await getIncrAndDecrCounter(addCountId, reduceCountId, counter, num);
    dispatch({ type: COUNTER_CHANGE, payload: counterObj });
  };
}

export function resetCount(counter: CounterType): DispatchFuncType {
  return async function (dispatch) {
    const counterObj = await getResetCounter(counter);
    dispatch({ type: COUNTER_CHANGE, payload: counterObj });
  };
}
