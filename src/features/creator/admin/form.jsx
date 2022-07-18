import TextField from "@/ui/forms/text-field";
import H1 from "@/ui/headings/h1";
import Button from "@/ui/buttons";

export default function CreatorAdminForm({
  values,
  onChange = () => {},
  onSave = () => {},
}) {
  const { name, photo, company, www } = values;

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-4 my-8 ">
      <H1>Edit creator info</H1>
      <TextField
        value={name}
        placeholder="Your name"
        onChange={(name) =>
          onChange({
            ...values,
            name,
          })
        }
      />

      <TextField
        value={photo}
        placeholder="A url that hosts your photo"
        onChange={(photo) =>
          onChange({
            ...values,
            photo,
          })
        }
      />

      <TextField
        value={company}
        placeholder="Company name?"
        onChange={(company) =>
          onChange({
            ...values,
            company,
          })
        }
      />

      <TextField
        value={www}
        placeholder="Website address"
        onChange={(www) =>
          onChange({
            ...values,
            www,
          })
        }
      />

      <Button onClick={onSave}>Save</Button>
    </form>
  );
}
