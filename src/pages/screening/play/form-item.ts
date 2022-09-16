import { SCREENSELECTOPTIONS, SCREENTYPEOPTIONS } from '@/utils/form-constant';

export const FormItemOptions: Pick<API.PropsType, 'filterList'> = {
  filterList: [
    {
      type: 'inputGroup',
      selectInitial: 'title',
      value: 'inputKey',
      valueEnum: SCREENSELECTOPTIONS,
    },
    {
      label: '筛查类型',
      type: 'select',
      value: 'screeningBizType',
      valueEnum: SCREENTYPEOPTIONS,
    },
  ],
};
