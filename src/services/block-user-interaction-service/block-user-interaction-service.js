import { bodySelector } from '../../constants/constants';

export function blockUserInteraction() {  
    bodySelector.style.pointerEvents = 'none';
    bodySelector.style.userSelect = 'none';
    bodySelector.style.cursor = 'default';
}

export function unblockUserInteraction() {
  bodySelector.style.pointerEvents = '';
  bodySelector.style.userSelect = '';
  bodySelector.style.cursor = '';
}