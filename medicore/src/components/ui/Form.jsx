import { useState } from "react";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";

function Form({
  fields,
  initialValues = {},
  onSubmit,
  onCancel,
  isSaving,
  submitLabel,
}) {
  const [values, setValues] = useState(() => {
    const base = { id: initialValues.id ?? null };
    fields.forEach((field) => {
      base[field.name] =
        initialValues[field.name] ??
        (field.type === "select" ? (field.options?.[0]?.value ?? "") : "");
    });
    return base;
  });

  function handleChange(name) {
    return (e) => setValues((prev) => ({ ...prev, [name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {fields.map((field) =>
        field.type === "select" ? (
          <Select
            key={field.name}
            label={field.label}
            value={values[field.name]}
            onChange={handleChange(field.name)}
            required={field.required}>
            {field.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        ) : (
          <Input
            key={field.name}
            label={field.label}
            type={field.type || "text"}
            value={values[field.name]}
            onChange={handleChange(field.name)}
            required={field.required}
          />
        ),
      )}

      <div className="flex justify-end gap-2 mt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving
            ? "Saving..."
            : (submitLabel ?? (values.id ? "Save changes" : "Create"))}
        </Button>
      </div>
    </form>
  );
}

export default Form;
