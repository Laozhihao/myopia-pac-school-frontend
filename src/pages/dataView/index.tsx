import React from 'react';
import styles from './index.less';

const DataView: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <iframe
        className={styles.iframe}
        width={'100%'}
        height={'100%'}
        src="https://datav.aliyuncs.com/share/91e0642d4e3b6a4891a2ddda7822185b"
      />
    </div>
  );
};

export default DataView;
