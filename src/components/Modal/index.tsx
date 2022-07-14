import { ReactNode, MouseEventHandler, useRef, useEffect } from 'react';
type ModalProps = {
  show: Boolean;
  children?: ReactNode;
  align: 'center' | 'right';
  className?: string;
  onClose?: MouseEventHandler;
};
const Modal = ({ show = false, children, align, className = '', onClose = () => {} }: ModalProps) => {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose && onClose(event);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });
  if (show)
    return (
      <div className="fixed left-0 top-0 bg-black-100/70 h-screen w-screen z-20">
        <div ref={ref} className={`absolute z-30 ${align === 'right' && 'right-0'} ${className}`}>
          {children}
        </div>
      </div>
    );
  else return <div />;
};

export default Modal;
