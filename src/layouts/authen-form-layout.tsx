import { Logo } from '../components/logo/logo';
import styles from './authen-form-layout.module.css';

export function AuthenFormLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.page}>
      <div className={styles.mainContent}>
        <div className="w-100 d-flex justify-content-center">
          <Logo size={50} />
        </div>
        <div className={styles.formWrapper}>{children}</div>
      </div>
    </div>
  );
}
