import { FieldError } from 'react-hook-form';

type Props = {
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  label?: string;
  placeholder?: string;
  type: string;
  name?: string;
  id?: string;
  defaultValue?: string;
  register?: Function;
  validation?: object;
  error?: FieldError;
  errorText?: string;
  onChange?: Function;
  iconUrl?: string;
};

const Input = ({
  className = '',
  inputClassName = '',
  labelClassName = '',
  label = '',
  placeholder = '',
  type,
  id = '',
  name = '',
  defaultValue = '',
  register = () => {},
  onChange = () => {},
  validation,
  error,
  errorText = 'Please enter a value',
  iconUrl = '',
}: Props) => (
  <div className={`grid grid-cols-1 mb-4 relative ${className ? className : ''}`}>
    {label && <label className={`text-xs text-white/[0.8] mb-1 ${labelClassName}`}>{label}</label>}
    <div className="grid grid-cols-1 relative">
      {iconUrl && <img src={iconUrl} alt="start" className={`absolute top-3 left-3`} />}
      <input
        className={`rounded-md text-sm py-3.5 px-3 ${inputClassName} ${iconUrl ? 'pl-10' : ''} ${
          error ? 'border border-danger' : ''
        }`}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(name, validation)}
        onChange={onChange}
      ></input>
    </div>
    {error && <p className="text-xs text-danger mt-1">{errorText}</p>}
  </div>
);

export default Input;
