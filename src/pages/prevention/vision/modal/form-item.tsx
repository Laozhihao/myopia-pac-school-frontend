import { defaultRulesConfig } from '@/utils/common';
import { dialogColConfig } from '@/utils/config-constant';
import { isPhoneNum86, isIdCard } from '@vistel/vistel-utils/lib/validator';
import styles from '@/styles/overwrite.less';

export const FormItemOptions: Pick<API.PropsType, 'filterList'> = {
  filterList: [
    {
      label: '姓名',
      type: 'input',
      value: 'staffName',
      ...dialogColConfig,
      rules: defaultRulesConfig('输入姓名'),
      fieldProps: {
        maxLength: 15,
      },
    },
    {
      label: '身份证',
      type: 'input',
      value: 'idCard',
      ...dialogColConfig,
      required: true,
      fieldProps: {
        type: navigator.userAgent.indexOf('AppleWebKit') > -1 ? 'text' : 'password',
        autoComplete: 'new-password',
        className: styles.input_security,
      },
      rules: [
        {
          validator(_: any, value: any) {
            if (!value) return Promise.reject('请输入身份证号');
            if (!isIdCard(value)) return Promise.reject('请输入正确的身份证号');
            return Promise.resolve();
          },
        },
      ],
    },

    {
      label: '手机号码',
      type: 'input',
      value: 'phone',
      ...dialogColConfig,
      required: true,
      rules: [
        {
          validator(_: any, value: any) {
            if (!value) return Promise.reject('请输入手机号码');
            if (!isPhoneNum86(value)) return Promise.reject('请输入正确的手机号码');
            return Promise.resolve();
          },
        },
      ],
    },
    {
      label: '说明',
      type: 'textArea',
      value: 'remark',
      ...dialogColConfig,
      fieldProps: {
        maxLength: 100,
      },
    },
  ],
};
