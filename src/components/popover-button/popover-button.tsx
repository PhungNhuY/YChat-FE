import clsx from 'clsx';
import styles from './popover-button.module.css';

export function PopoverButton({
  text,
  onClick,
}: {
  text: string;
  onClick: () => any;
}) {
  return (
    <button
      className={clsx(styles.btn, 'w-100 empty-button')}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
