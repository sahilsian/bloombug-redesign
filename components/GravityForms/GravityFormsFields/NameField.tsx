import { gql } from "@apollo/client";

import { NameField as NameFieldType, NameInput, FieldError } from "../../../generated/graphql";
import useGravityForm, { ACTION_TYPES, FieldValue, NameFieldValue } from "../../../hooks/useGravityForm";
import { Input } from "../../Core/Input";

export const NAME_FIELD_FIELDS = gql`
  fragment NameFieldFields on NameField {
    id
    label
    description
    cssClass
    isRequired
    inputs {
      ... on NameInputProperty {
        id
        name
        isHidden
        placeholder
        label
        key
        hasChoiceValue
        defaultValue
        customLabel
      }
    }
  }
`;

interface Props {
  field: NameFieldType;
  fieldErrors: FieldError[];
}

const DEFAULT_VALUE: NameInput = {};

const AUTOCOMPLETE_ATTRIBUTES: { [key: string]: string } = {
  prefix: 'honorific-prefix',
  first: 'given-name',
  middle: 'additional-name',
  last: 'family-name',
  suffix: 'honorific-suffix',
};

export default function NameField({ field, fieldErrors }: Props) {
  const { id, formId, type, label, description, cssClass, isRequired, inputs } = field;
  const htmlId = `field_${formId}_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find((fieldValue: FieldValue) => fieldValue.id === id) as NameFieldValue | undefined;
  const nameValues = fieldValue?.nameValues || DEFAULT_VALUE;

  const prefixInput = inputs?.find(input => input?.key === 'prefix');
  const otherInputs = inputs?.filter(input => input?.key !== 'prefix') || [];

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    const newNameValues = { ...nameValues, [name]: value };

    dispatch({
      type: ACTION_TYPES.updateNameFieldValue,
      fieldValue: {
        id,
        nameValues: newNameValues,
      },
    });
  }

  return (
    <fieldset id={htmlId} className={`gfield flex text-white gap-2 gfield-${type} ${cssClass}`.trim()}>
      {prefixInput && !prefixInput.isHidden ?
        <>
          <select
            name={String(prefixInput.key)}
            id={`input_${formId}_${id}_${prefixInput.key}`}
            autoComplete={AUTOCOMPLETE_ATTRIBUTES.prefix}
            value={nameValues.prefix || ''}
            onChange={handleChange}
          >
            <option value=""></option>
            {prefixInput.choices?.map(choice =>
              <option
                key={choice?.value}
                value={String(choice?.value)}
              >
                {String(choice?.text)}
              </option>
            )}
          </select>
          <label htmlFor={`input_${formId}_${id}_${prefixInput.key}`}>{prefixInput.label}</label>
        </> : null
      }
      {otherInputs.map(input => {
        const key = input?.key as keyof NameInput;
        const inputLabel = input?.label || '';
        const placeholder = input?.placeholder || '';
        return (
          !input.isHidden && 
          <div className="w-full" key={key}>
            <label className="label text-left" htmlFor={`input_${formId}_${id}_${key}`}>{`${inputLabel} ${isRequired ? " *" : " "}`}</label>
            <Input
              type="text"
              name={String(key)}
              id={`input_${formId}_${id}_${key}`}
              placeholder={placeholder}
              autoComplete={AUTOCOMPLETE_ATTRIBUTES[key]}
              value={nameValues?.[key] || ''}
              onChange={handleChange}
            />
            
          </div>
        );
      }
      )}
      {description ? <p className="field-description">{description}</p> : null}
      {fieldErrors?.length ? fieldErrors.map(fieldError => (
        <p key={fieldError.id} className="error-message">{fieldError.message}</p>
      )) : null}
    </fieldset>
  );
}
