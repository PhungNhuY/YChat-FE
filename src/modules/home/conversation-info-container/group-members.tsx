import { CollapseProps } from 'antd';
import collapseStyle from './custom-collapse.module.css';
import clsx from 'clsx';
import { CustomCollapse } from './custom-collapse';

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: <span className={clsx(collapseStyle.title)}>Members</span>,
    children: <p></p>,
  },
];

export function GroupMembers() {
  return <CustomCollapse items={items} />;
}
