import { gql } from "@apollo/client";

import { EmailField as EmailFieldType, FieldError } from "../../../generated/graphql";
import useGravityForm, { ACTION_TYPES, FieldValue, EmailFieldValue } from "../../../hooks/useGravityForm";
import { Input } from "../../Core/Input";

export const EMAIL_FIELD_FIELDS = gql`
  fragment EmailFieldFields on EmailField {
    id
    label
    description
    cssClass
    isRequired
    placeholder
  }
`;

interface Props {
  field: EmailFieldType;
  fieldErrors: FieldError[];
}

const DEFAULT_VALUE = '';

export default function EmailField({ field, fieldErrors }: Props) {
  const { id, type, label, description, cssClass, isRequired, placeholder } = field;
  const htmlId = `field_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find((fieldValue: FieldValue) => fieldValue.id === id) as EmailFieldValue | undefined;
  const value = fieldValue?.emailValues?.value || DEFAULT_VALUE;

  return (
    <div className={`gfield text-white gfield-${type} ${cssClass}`.trim()}>
      <label className="label text-left" htmlFor={htmlId}>{`${label} ${isRequired ? " *" : " "}`}</label>
      <Input
        type="email"
        name={String(id)}
        id={htmlId}
        placeholder={placeholder || ''}
        required={Boolean(isRequired)}
        value={value}
        onChange={event => {
          dispatch({
            type: ACTION_TYPES.updateEmailFieldValue,
            fieldValue: {
              id,
              emailValues: {
                value: event.target.value,
              }
            },
          })
        }}
      />
      {description ? <p className="field-description">{description}</p> : null}
      {fieldErrors?.length ? fieldErrors.map(fieldError => (
        <p key={fieldError.id} className="error-message">{fieldError.message}</p>
      )) : null}
    </div>
  );
}
