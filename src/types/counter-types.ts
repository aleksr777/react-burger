export type CounterActionsType = 'COUNTER_CHANGE';

export type CounterObjType = { [key: string]: number | unknown };

export type CounterStateType = { counter: CounterObjType };

export type CounterDispatchActionType = {
  type: CounterActionsType;
  payload: CounterStateType | {};
};
