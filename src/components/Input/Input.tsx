interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
}

export const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <>
      {label && (
        <label
          htmlFor={props.name}
          className="mb-3 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-primary-500 sm:text-sm"
        {...props}
      />
    </>
  );
};
