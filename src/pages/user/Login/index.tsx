import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { message, Modal } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { history, useModel } from 'umi';
import jwt from 'jsonwebtoken';
import { toFormData } from '@/utils/common';
import { login, getUserInfo } from '@/api/common';
import styles from './index.less';
import asideImg from '@/assets/images/login-aside.png';
import logoImg from '@/assets/images/login-logo.png';
import Slider from '@/components/VerifySlider/index.js';
import '@/components/VerifySlider/index.less';
import type { LoginParams } from '@/api/typings';
import { setStorageInfo, setToken, USER } from '@/hook/storage';
import { modalConfig } from '@/hook/ant-config';

// token前缀 Bearer
let verifyCount = 0;
let verifyRejectCb: (reason?: any) => void = () => {};

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [visible, setVisible] = useState(false); // 滑块验证弹窗
  const { setInitialState } = useModel('@@initialState');

  /**
   * @desc 用户信息 并且存储
   */
  const getUserInfomation = async (token: any) => {
    if (token) {
      const payload = jwt.decode(token);
      const { userInfo } = payload;
      const res = await getUserInfo(userInfo?.id);
      setStorageInfo(USER, res.data, null);
      await setInitialState((s) => ({ ...s, currentUser: res.data }));
    }
  };

  /**
   * @desc 验证弹窗关闭
   */
  const onCancel = () => {
    verifyCount = 0;
    verifyRejectCb?.();
    setVisible(false);
    const captchaEl: any = document.querySelector('#captcha');
    captchaEl.innerHTML = '';
  };

  /**
   * @desc 验证成功
   */
  const verifySuccess = (cb: (value?: unknown) => void) => {
    verifyRejectCb = () => {};
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
      verifyRejectCb = reject;
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
      client_id: '2',
      client_secret: '123456',
    };

    try {
      const res = await login(toFormData(parm));
      setSubmitting(false);
      const { accessToken } = res?.data!.tokenInfo;
      setToken(res.data!.tokenInfo);
      await getUserInfomation(accessToken);
      const { query } = history.location;
      const { redirect } = query as {
        redirect: string;
      };
      history.replace(redirect || '/');
    } catch (err) {
      console.log(err);
      setSubmitting(false);
    }
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
            <p className={styles.title}>近视防控学校管理平台</p>
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
                placeholder="请输入账号"
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
                placeholder="请输入密码"
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
              <p className={styles.tip}>如忘记密码，请联系管理员</p>
            </ProForm>
            <p className={styles.version}>版本号：G2.0.0</p>
          </div>
        </div>
      </div>

      <Modal
        visible={visible}
        title="请完成安全验证"
        onCancel={onCancel}
        width="fit-content"
        footer={null}
        {...modalConfig}
      >
        <div id="captcha" />
      </Modal>
    </>
  );
};

export default Login;
