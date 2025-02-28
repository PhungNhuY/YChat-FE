import styles from './logo.module.css';

export function Logo({ size }: { size?: number }) {
  return (
    <span style={{ fontSize: size }} className={styles.text}>
      YChat
    </span>
  );
}
