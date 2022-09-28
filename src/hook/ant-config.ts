import { createContext } from 'react';

export const getPopupContainer = (triggerNode: any) => {
  return triggerNode.parentNode || document.body;
};

// modal
export const modalConfig = {
  centered: true,
  bodyStyle: {
    overflow: 'auto',
  },
};

// input group 声明
export const TableListCtx = createContext<{ ref?: any }>({});
