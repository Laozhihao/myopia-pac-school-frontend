export const getPopupContainer = (triggerNode: any) => {
  triggerNode.parentNode.style.position = 'relative';
  return triggerNode.parentNode || document.body;
};
