import { gql } from "@apollo/client";
import React from "react";

import { AddressField as AddressFieldType, AddressInput, FieldError } from "../../../generated/graphql";
import useGravityForm, { ACTION_TYPES, FieldValue, AddressFieldValue } from "../../../hooks/useGravityForm";
import { Input } from "../../Core/Input";

export const ADDRESS_FIELD_FIELDS = gql`
  fragment AddressFieldFields on AddressField {
    id
    label
    description
    cssClass
    isRequired
    inputs {
      ... on AddressInputProperty {
        id
        name
        isHidden
        label
        placeholder
        key
        defaultValue
        customLabel
        autocompleteAttribute
      }
    }
  }
`;

interface Props {
  field: AddressFieldType;
  fieldErrors: FieldError[];
}

const DEFAULT_VALUE: AddressInput = {};

const AUTOCOMPLETE_ATTRIBUTES: { [key: string]: string } = {
  street: 'address-line1',
  lineTwo: 'address-line2',
  city: 'address-level2',
  state: 'address-level1',
  country: 'country-name',
};

export default function AddressField({ field, fieldErrors }: Props) {
  const { id, type, label, description, cssClass, isRequired, inputs } = field;
  const htmlId = `field_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find((fieldValue: FieldValue) => fieldValue.id === id) as AddressFieldValue | undefined;
  const addressValues = fieldValue?.addressValues || DEFAULT_VALUE;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const newAddressValues = { ...addressValues, [name]: value };

    dispatch({
      type: ACTION_TYPES.updateAddressFieldValue,
      fieldValue: {
        id,
        addressValues: newAddressValues,
      },
    });
  }

  return (
    <fieldset id={htmlId} className={`gfield w-full grid grid-cols-2 justify-evenly gap-4 gfield-${type} ${cssClass}`.trim()}>
      <legend className="text-sm font-[400] mb-3">{label} {isRequired ? " *" : " "}</legend>
      {inputs?.map(input => {
        const key = input?.key as keyof AddressInput;
        const inputLabel = input?.customLabel || '';
        const placeholder = input?.placeholder || '';
        return (
          !input.isHidden && 
          input.key === 'country' ? 
          <div key={key} className="">
            <label className="label" htmlFor={`input_${id}_${key}`}>{`${inputLabel}`}</label>
            <Input
              type="text"
              name={String(key)}
              id={`input_${id}_${key}`}
              required={Boolean(isRequired)}
              placeholder={placeholder}
              autoComplete={AUTOCOMPLETE_ATTRIBUTES[key]}
              value={addressValues?.[key] ?? ''}
              onChange={handleChange}
            />
            
          </div>
          :
          <div key={key} className="">
            <label className="label" htmlFor={`input_${id}_${key}`}>{`${inputLabel}`}</label>
            <Input
              type="text"
              name={String(key)}
              id={`input_${id}_${key}`}
              required={Boolean(isRequired)}
              placeholder={placeholder}
              autoComplete={AUTOCOMPLETE_ATTRIBUTES[key]}
              value={addressValues?.[key] ?? ''}
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
