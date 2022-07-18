import { useState, useEffect } from "react";
import { isUrl, isImageUrl, minLength } from "./validations";
export { isUrl, isImageUrl, minLength };

export default function withValidation(Component) {
  return function ({
    onChange,
    value,
    validations = [],
    onValidation = () => [],
    ...rest
  }) {
    const [errors, setErrors] = useState([]);
    const [touched, setTouched] = useState(false);

    useEffect(() => {
      if (!touched && value.length === 0) return;

      setErrors(() => {
        const errors = validations
          .map((validator) =>
            Array.isArray(validator)
              ? validator[0](value, validator[1])
              : validator(value)
          )
          .filter((val) => val.length > 0);
        onValidation(errors);
        return errors;
      });
    }, [value, touched]);

    return (
      <div>
        <Component
          onChange={(value) => {
            onChange(value);
            setTouched(true);
          }}
          value={value}
          {...rest}
        />
        {errors.length > 0 && (
          <div className="text-red-500 text-sm">{errors.join(", ")}</div>
        )}
      </div>
    );
  };
}
