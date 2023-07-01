export type CounterActionsType = 'COUNTER_CHANGE';
import { CounterType } from '../types/types';

export type CounterStateType = { counter: CounterType };

export type CounterDispatchType = {
  type: CounterActionsType;
  payload: CounterStateType | {};
};
