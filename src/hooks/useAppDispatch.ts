import { useDispatch } from 'react-redux';
import { store } from '../store/store';

type DispatchFunc = () => typeof store.dispatch;

export const useAppDispatch: DispatchFunc = useDispatch;
