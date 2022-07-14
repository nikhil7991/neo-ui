type Props = {
  className?: string;
  label?: string;
  error?: boolean;
  errorText?: string;
  id: string;
};

const Checkbox = ({ className, label, error = false, errorText = 'Please enter the value', id = '' }: Props) => (
  <div className={`flex mb-6 ${className ? className : ''}`}>
    <input className="mr-2 rounded" type="checkbox" id={id}></input>
    {label && (
      <label htmlFor={id} className="text-sm text-white cursor-pointer">
        {label}
      </label>
    )}
  </div>
);

export default Checkbox;
