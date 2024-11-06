import clsx from 'clsx';
import styles from './popover-button.module.css';
import { ReactNode } from 'react';

export function PopoverButton({
  text,
  icon,
  onClick,
}: {
  text: string;
  icon: ReactNode;
  onClick: () => any;
}) {
  return (
    <button
      className={clsx(styles.btn, 'w-100 empty-button')}
      onClick={onClick}
    >
      {icon}
      <div className="me-2 d-inline"></div>
      {text}
    </button>
  );
}
