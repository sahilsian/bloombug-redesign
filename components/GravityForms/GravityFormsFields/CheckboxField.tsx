import { gql } from "@apollo/client";

import { CheckboxField as CheckboxFieldType, CheckboxInput, FieldError } from "../../../generated/graphql";
import useGravityForm, { ACTION_TYPES, FieldValue, CheckboxFieldValue } from "../../../hooks/useGravityForm";

export const CHECKBOX_FIELD_FIELDS = gql`
  fragment CheckboxFieldFields on CheckboxField {
    id
    label
    description
    cssClass
    inputs {
      id
    }
    isRequired
    choices {
      text
      value
    }
  }
`;

interface Props {
  field: CheckboxFieldType;
  fieldErrors: FieldError[];
}

const DEFAULT_VALUE: CheckboxInput[] = [];

export default function CheckboxField({ field, fieldErrors }: Props) {
  const { id, type, label, description, cssClass, inputs, isRequired, choices } = field;
  const checkboxInputs = choices?.map((choice, index) => ({ ...choice, id: inputs?.[index]?.id })) || [];
  const htmlId = `field_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find((fieldValue: FieldValue) => fieldValue.id === id) as CheckboxFieldValue | undefined;
  const checkboxValues = fieldValue?.checkboxValues || DEFAULT_VALUE;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, checked } = event.target;
    const otherCheckboxValues = checkboxValues.filter(
      (checkboxValue: CheckboxInput) => checkboxValue.inputId !== Number(name)
    );
    const newCheckboxValues = checked ?
      [...otherCheckboxValues, { inputId: Number(name), value }]
      :
      otherCheckboxValues;

    dispatch({
      type: ACTION_TYPES.updateCheckboxFieldValue,
      fieldValue: {
        id,
        checkboxValues: newCheckboxValues,
      },
    });
  }

  return (
    <fieldset id={htmlId} className={`gfield text-left mb-3 gfield-${type} ${cssClass}`.trim()}>
      <legend className="text-left label mb-3">{`${label} ${isRequired ? " *" : " "}`}</legend>
      {checkboxInputs.map(({ id: inputId, text, value }) =>
        <div key={inputId} className="py-1">
          <input
            type="checkbox"
            name={String(inputId)}
            required={Boolean(isRequired)}
            id={`input_${id}_${inputId}`}
            value={String(value)}
            onChange={handleChange}
          />
          <label className="pl-4 text-lg" htmlFor={`input_${id}_${inputId}`}>{text}</label>
        </div>
      )}
      {description ? <p className="field-description">{description}</p> : null}
      {fieldErrors?.length ? fieldErrors.map(fieldError => (
        <p key={fieldError.id} className="error-message">{fieldError.message}</p>
      )) : null}
    </fieldset>
  );
}
