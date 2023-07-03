import { CounterType } from '../types/types';

export type CounterStateType = { counter: CounterType };

export type CounterDispatchType = {
  type: 'COUNTER_CHANGE';
  payload: CounterStateType | {};
};
