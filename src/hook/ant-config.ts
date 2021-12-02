export const getPopupContainer = (triggerNode: any) => {
  triggerNode.parentNode.style.position = 'relative';
  return triggerNode.parentNode || document.body;
};

// modal
export const modalConfig = {
  centered: true,
  bodyStyle: {
    overflow: 'auto',
  },
};
