import { gql } from "@apollo/client";
import { Textarea } from '../../Core/Textarea'
import { TextAreaField as TextAreaFieldType, FieldError } from "../../../generated/graphql";
import useGravityForm, { ACTION_TYPES, FieldValue, StringFieldValue } from "../../../hooks/useGravityForm";

export const TEXT_AREA_FIELD_FIELDS = gql`
  fragment TextAreaFieldFields on TextAreaField {
    id
    label
    description
    cssClass
    placeholder
    isRequired
  }
`;

interface Props {
  field: TextAreaFieldType;
  fieldErrors: FieldError[];
}

const DEFAULT_VALUE = '';

export default function TextAreaField({ field, fieldErrors }: Props) {
  const { id, type, label, description, cssClass, placeholder, isRequired } = field;
  const htmlId = `field_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find((fieldValue: FieldValue) => fieldValue.id === id) as StringFieldValue | undefined;
  const value = fieldValue?.value || DEFAULT_VALUE;

  return (
    <div className={`gfield gfield-${type} ${cssClass}`.trim()}>
      <label className="text-left label" htmlFor={htmlId}>{`${label} ${isRequired ? " *" : " "}`}</label>
      <Textarea
        name={String(id)}
        id={htmlId}
        required={Boolean(isRequired)}
        value={value}
        placeholder={placeholder}
        onChange={event => {
          dispatch({
            type: ACTION_TYPES.updateTextAreaFieldValue,
            fieldValue: {
              id,
              value: event.target.value,
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
