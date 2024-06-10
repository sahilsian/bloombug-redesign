import { gql } from "@apollo/client";

import { NumberField as NumberFieldType, FieldError } from "../../../generated/graphql";
import useGravityForm, { ACTION_TYPES, FieldValue, NumberFieldValue } from "../../../hooks/useGravityForm";
import { Input } from "../../Core/Input";

export const NUMBER_FIELD_FIELDS = gql`
  fragment NumberFieldFields on NumberField {
    id
    label
    description
    cssClass
    isRequired
    placeholder
  }
`;

interface Props {
    field: NumberFieldType;
    fieldErrors: FieldError[];
}

const DEFAULT_VALUE = '';

export default function NumberField({ field, fieldErrors }: Props) {
    const { id, type, label, visibility, description, cssClass, isRequired, placeholder } = field;
    const htmlId = `field_${id}`;
    const { state, dispatch } = useGravityForm();
    const fieldValue = state.find((fieldValue: FieldValue) => fieldValue.id === id) as NumberFieldValue | undefined;
    const value = fieldValue?.value || DEFAULT_VALUE;
    return (
        <div className={`gfield gfield-${type} ${cssClass}`.trim()}>
        <label className="text-left label" htmlFor={htmlId}>{`${label} ${isRequired ? " *" : " "}`}</label>
        <Input
        type="text"
        inputMode="numeric"
        name={String(id)}
        pattern="-?[0-9]*"
        id={htmlId}
        required={Boolean(isRequired)}
        placeholder={placeholder || ''}
        value={value}
        onChange={event => {
            if (/^\d*\.?\d*$/.test(event.target.value)) {
                dispatch({
                    type: ACTION_TYPES.updateNumberFieldValue,
                    fieldValue: {
                        id,
                        value: event.target.value,
                    },
                });
            }
        }}
      />
      {description ? <p className="field-description">{description}</p> : null}
      {fieldErrors?.length ? fieldErrors.map(fieldError => (
        <p key={fieldError.id} className="error-message">{fieldError.message}</p>
      )) : null}
    </div>
    )
}