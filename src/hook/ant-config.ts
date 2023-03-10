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

// 数据报送modal
export const reportModalConfig = {
  centered: true,
  width: 780,
  bodyStyle: {
    minHeight: '220px',
    maxHeight: '460px',
    overflow: 'auto',
  },
};

// input group 声明
export const TableListCtx = createContext<{ ref?: any }>({});
