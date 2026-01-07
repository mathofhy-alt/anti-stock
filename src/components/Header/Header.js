import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    <Link href="/">안티-주식</Link>
                </div>
                <ul className={styles.links}>
                    <li><Link href="/">홈</Link></li>
                    <li><Link href="/domestic">국내증시</Link></li>
                    <li><Link href="/overseas">해외증시</Link></li>
                    <li><Link href="/guide">가이드</Link></li>
                </ul>
            </nav>
        </header>
    );
}
