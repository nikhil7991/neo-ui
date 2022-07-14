import { useEffect, useRef, useState } from 'react';

type Props = {
  className?: string;
  selectClassName?: string;
  labelClassName?: string;
  label?: string;
  placeholder?: string;
  options: Array<Option>;
  name?: string;
  id?: string;
  register?: Function;
  onChange?: Function;
  setValue?: Function;
  validation?: object;
  error?: boolean;
  errorText?: string;
  defaultValue?: string;
  iconUrl?: string;
};

type Option = {
  code: string;
  name: string;
};

const CustomSelect = ({
  className,
  selectClassName = '',
  labelClassName = '',
  label,
  placeholder = '',
  options,
  id = '',
  name = '',
  register = () => {},
  onChange = () => {},
  setValue = () => {},
  validation,
  error = false,
  errorText = 'Please enter the value',
  defaultValue = '',
  iconUrl = '',
}: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const [value, setOptionValue] = useState(defaultValue);
  const [otpionName, setOptionName] = useState<any>(options.find((option) => option.code === defaultValue)?.name);
  const ref = useRef<HTMLInputElement>(null);

  const onClose = (event: any) => {
    setShowDropdown(false);
  };
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

  return (
    <div className={`grid grid-cols-1 mb-6 ${className ? className : ''}`}>
      {label && <label className={`text-sm text-gray-600 mb-1 ${labelClassName}`}>{label}</label>}
      {iconUrl && <img src={iconUrl} alt="start" className="absolute" />}
      <select
        id={id}
        name={name}
        //   className={`rounded-md text-sm py-3.5 px-3 ${selectClassName} ${
        //     error ? "border border-danger" : ""
        //   }`}
        className="hidden"
        {...register(name, validation)}
        defaultValue={defaultValue}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      >
        {placeholder && (
          <option value="" hidden>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.code} value={option.code}>
            {option.name}
          </option>
        ))}
      </select>
      <div className="relative">
        <div
          className={`rounded-md text-sm py-3.5 px-3 cursor-pointer ${selectClassName} ${
            error ? 'border border-danger' : ''
          }`}
          onClick={() => setShowDropdown(true)}
        >
          {otpionName ? otpionName : placeholder}

          <span className="float-right mt-1.5">
            <img src="/assets/icons/dropdown_arrow.svg" alt="arrow" className={!showDropdown ? 'rotate-180' : ''} />
          </span>
        </div>
        {showDropdown && (
          <div className="rounded-lg p-3 absolute bg-dropdownBG text-white z-10 w-full mt-2" ref={ref}>
            {options.map((option) => (
              <div
                key={option.code}
                className="rounded-md px-2 py-2 hover:bg-danger cursor-pointer"
                onClick={() => {
                  setValue(name, option.code);
                  setOptionValue(option.code);
                  onChange(option.code);
                  setOptionName(option.name);
                  setShowDropdown(false);
                }}
              >
                {option.name}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-danger mt-1">{errorText}</p>}
    </div>
  );
};

export default CustomSelect;
