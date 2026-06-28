import './Button.scss';

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  rel?: string;
  target?: string;
  variant?: 'dark' | 'light';
};

export function Button({ children, className = '', href = '#', rel, target, variant = 'dark' }: ButtonProps) {
  return (
    <a className={`button button--${variant}${className ? ` ${className}` : ''}`} href={href} rel={rel} target={target}>
      {children}
    </a>
  );
}
