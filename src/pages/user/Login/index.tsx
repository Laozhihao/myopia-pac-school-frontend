import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { message, Modal } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { useModel, history } from 'umi';
import Auth from '@/utils/authorization';
import { login } from '@/api/common';
import styles from './index.less';
import asideImg from '@/assets/images/login-aside.png';
import logoImg from '@/assets/images/login-logo.png';
import Slider from '@/components/VerifySlider/index.js';
import '@/components/VerifySlider/index.less';
import type { LoginParams } from '@/api/typings';

let verifyCount = 0;

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [visible, setVisible] = useState(false); // 滑块验证弹窗
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();

    if (userInfo) {
      await setInitialState((s) => ({ ...s, currentUser: userInfo }));
    }
  };

  /**
   * @desc 验证弹窗关闭
   */
  const onCancel = () => {
    verifyCount = 0;
    setVisible(false);
    const captchaEl: any = document.querySelector('#captcha');
    captchaEl.innerHTML = '';
  };

  /**
   * @desc 验证成功
   */
  const verifySuccess = (cb: (value?: unknown) => void) => {
    onCancel();
    cb();
  };

  /**
   * @desc 验证失败
   */
  const verifyFail = (cb: (reason?: any) => void) => {
    verifyCount += 1;
    if (verifyCount > 2) {
      message.error('验证失败！');
      onCancel();
      cb();
    }
  };

  /**
   * @desc 验证
   */
  const onVerify = () => {
    return new Promise((resolve, reject) => {
      setVisible(true);
      Slider.initOptions({
        el: document.getElementById('captcha'),
        onSuccess: () => verifySuccess(resolve),
        onFail: () => verifyFail(reject),
      });
      Slider.init();
    });
  };

  const handleSubmit = async (values: LoginParams) => {
    setSubmitting(true);
    const parm = {
      ...values,
      client_id: '1',
      client_secret: '123456',
    };
    console.log(parm, '登录');

    Auth.set('/* token */');
    console.log(initialState, values, 'info');
    setSubmitting(true);
    try {
      const msg = await login({ ...values });

      if (msg.status === 'ok') {
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        // todo setToken
        // Auth.set('/* token */');
        /** 此方法会跳转到 redirect 参数所在的位置 */

        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as {
          redirect: string;
        };
        history.push(redirect || '/');
        return;
      } // 如果失败去设置用户错误信息
    } catch (err) {
      console.log(err, 'error');
      // const defaultLoginFailureMessage = '登录失败，请重试！';
      // message.error(error);
    }
    // const msg = await login(parm);
    // console.log(msg, 'info');
    setSubmitting(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.aside}>
            <img className={styles.logo} src={logoImg} alt="" />
            <img className={styles.img} src={asideImg} alt="" />
          </div>
          <div className={styles.content}>
            <p className={styles.title}>近视防控家长端</p>
            <p className={styles.sub_title}>欢迎使用</p>
            <ProForm
              requiredMark={false}
              submitter={{
                searchConfig: {
                  submitText: '登录',
                },
                render: (_, dom) => dom.pop(),
                submitButtonProps: {
                  loading: submitting,
                  size: 'large',
                  style: {
                    width: '100%',
                  },
                },
              }}
              onFinish={async (values: LoginParams) => {
                await onVerify();
                await handleSubmit(values as LoginParams);
              }}
            >
              <ProFormText
                label={'账号'}
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'账号: admin or user'}
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                label={'密码'}
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'密码: ant.design'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
              <p className={styles.tip}>如忘记密码，请联系管理员</p>
            </ProForm>
          </div>
        </div>
      </div>

      <Modal
        visible={visible}
        title="请完成安全验证"
        onCancel={onCancel}
        width="fit-content"
        footer={null}
      >
        <div id="captcha" />
      </Modal>
    </>
  );
};

export default Login;
