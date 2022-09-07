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
