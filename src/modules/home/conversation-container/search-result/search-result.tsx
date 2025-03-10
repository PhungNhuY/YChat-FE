import { Tabs, TabsProps } from 'antd';
import clsx from 'clsx';
import styles from './search-result.module.css';
import { useState } from 'react';
import { UsersTab } from './users-tab';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'People',
    children: <UsersTab />,
  },
  {
    key: '2',
    label: 'Groups',
    disabled: true,
  },
];

export function SearchResult() {
  const [activeTab, setActiveTab] = useState('1');
  return (
    <Tabs
      activeKey={activeTab}
      onChange={(key) => setActiveTab(key)}
      items={items}
      className={clsx(
        'flex-expanding-size overflow-y-auto overflow-x-hidden',
        styles.tabs,
      )}
      size="small"
    ></Tabs>
  );
}
