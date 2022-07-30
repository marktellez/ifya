import { useState } from "react";
import TextField from "@/ui/forms/text-field";
import H1 from "@/ui/headings/h1";
import Button from "@/ui/buttons";
import withValidation, { minLength, isUrl } from "@/ui/forms/with-validation";

const NameField = withValidation(TextField);
const PhotoField = withValidation(TextField);
const CompanyField = withValidation(TextField);
const WebsiteField = withValidation(TextField);

export default function CreatorAdminForm({
  values,
  onChange = () => {},
  onSave = () => {},
}) {
  const { name, photo, company, www } = values;

  const [fieldValidations, setFieldValidations] = useState({
    name: false,
    photo: false,
    company: false,
    www: false,
  });

  function validateForm(field, errors) {
    setFieldValidations((prev) => ({
      ...prev,
      [field]: errors.length === 0,
    }));
  }

  function valid() {
    return Object.keys(fieldValidations).every((key) => fieldValidations[key]);
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-4 my-8 ">
      <H1>Edit creator info</H1>

      <NameField
        validations={[[minLength, 4]]}
        onValidation={(errors) => validateForm("name", errors)}
        value={name}
        placeholder="Your name"
        onChange={(name) =>
          onChange({
            ...values,
            name,
          })
        }
      />

      <PhotoField
        validations={[isUrl]}
        onValidation={(errors) => validateForm("photo", errors)}
        value={photo}
        placeholder="A url that hosts your photo"
        onChange={(photo) =>
          onChange({
            ...values,
            photo,
          })
        }
      />

      <CompanyField
        validations={[[minLength, 4]]}
        onValidation={(errors) => validateForm("company", errors)}
        value={company}
        placeholder="Company name?"
        onChange={(company) =>
          onChange({
            ...values,
            company,
          })
        }
      />

      <WebsiteField
        validations={[isUrl]}
        onValidation={(errors) => validateForm("www", errors)}
        value={www}
        placeholder="Website address"
        onChange={(www) =>
          onChange({
            ...values,
            www,
          })
        }
      />

      <Button disabled={!valid()} onClick={onSave}>
        Save
      </Button>
    </form>
  );
}
