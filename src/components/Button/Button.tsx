import './Button.scss';

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: 'dark' | 'light';
};

export function Button({ children, href = '#', variant = 'dark' }: ButtonProps) {
  return (
    <a className={`button button--${variant}`} href={href}>
      {children}
    </a>
  );
}
