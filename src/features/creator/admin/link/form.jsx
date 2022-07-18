import { useState, useEffect } from "react";
import TextField from "@/ui/forms/text-field";
import TextArea from "@/ui/forms/text-area";

import H1 from "@/ui/headings/h1";
import Button from "@/ui/buttons";
import withValidation, { minLength, isUrl } from "@/ui/forms/with-validation";

const UrlField = withValidation(TextField);
const TxtField = withValidation(TextArea);

export default function CreatorLinkAdminForm({
  values,
  onChange = () => {},
  onSave = () => {},
}) {
  const { text, url } = values;

  const [fieldValidations, setFieldValidations] = useState({
    url: false,
    text: false,
  });

  useEffect(() => {}, []);

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
      <H1>{values._id ? "Edit" : "Create"} link</H1>

      <UrlField
        validations={[isUrl]}
        onValidation={(errors) => validateForm("url", errors)}
        value={url}
        placeholder="Link url"
        onChange={(url) =>
          onChange({
            ...values,
            url,
          })
        }
      />

      <TxtField
        validations={[[minLength, 20]]}
        onValidation={(errors) => validateForm("text", errors)}
        value={text}
        placeholder="Text to display to users when they are on the get-it page"
        onChange={(text) =>
          onChange({
            ...values,
            text,
          })
        }
      />

      <Button disabled={!valid()} onClick={onSave}>
        {values._id ? "Update" : "Save"}
      </Button>
    </form>
  );
}
