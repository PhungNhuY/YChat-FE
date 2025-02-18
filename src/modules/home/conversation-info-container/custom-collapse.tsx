import { Collapse, CollapseProps } from 'antd';

export function CustomCollapse({ items }: { items: CollapseProps['items'] }) {
  return (
    <Collapse
      className="w-100 custom-ant-collapse"
      items={items}
      size="small"
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '0px',
      }}
    />
  );
}
