import TextField from "@/ui/forms/text-field";
import TextArea from "@/ui/forms/text-area";

import H1 from "@/ui/headings/h1";
import Button from "@/ui/buttons";

export default function CreatorLinkAdminForm({
  values,
  onChange = () => {},
  onSave = () => {},
}) {
  const { text, url } = values;

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-4 my-8 ">
      <H1>{values._id ? "Edit" : "Create"} link</H1>

      <TextField
        value={url}
        placeholder="Link url"
        onChange={(url) =>
          onChange({
            ...values,
            url,
          })
        }
      />

      <TextArea
        value={text}
        placeholder="Text to display to users when they are on the get-it page"
        onChange={(text) =>
          onChange({
            ...values,
            text,
          })
        }
      />

      <Button onClick={onSave}>{values._id ? "Update" : "Save"}</Button>
    </form>
  );
}
