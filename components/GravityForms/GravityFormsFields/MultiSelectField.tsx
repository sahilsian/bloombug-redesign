import { gql } from "@apollo/client";
import Select, { OnChangeValue, ActionMeta } from "react-select";

import { MultiSelectField as MultiSelectFieldType, FieldError } from "../../../generated/graphql";
import useGravityForm, { ACTION_TYPES, FieldValue, StringFieldValues } from "../../../hooks/useGravityForm";

export const MULTI_SELECT_FIELD_FIELDS = gql`
  fragment MultiSelectFieldFields on MultiSelectField {
    id
    label
    description
    cssClass
    isRequired
    choices {
      text
      value
    }
  }
`;

interface Props {
  field: MultiSelectFieldType;
  fieldErrors: FieldError[];
}

interface Option {
  value: string;
  label: string;
}

const DEFAULT_VALUE: string[] = [];

export default function MultiSelectField({ field, fieldErrors }: Props) {
  const { id, type, label, description, cssClass, isRequired, choices } = field;
  const htmlId = `field_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find((fieldValue: FieldValue) => fieldValue.id === id) as StringFieldValues | undefined;
  const values = fieldValue?.values || DEFAULT_VALUE;
  const options = choices?.map(choice => ({ value: choice?.value, label: choice?.text })) || [];
  const selectedOptions = options.filter(option => values.includes(String(option?.value)));

  function handleChange(value: OnChangeValue<any, boolean>, actionMeta: ActionMeta<any>) {
    const values = value.map((option: Option) => option.value);
    dispatch({
      type: ACTION_TYPES.updateMultiSelectFieldValue,
      fieldValue: { id, values },
    });
  }
  const customStyles = {
    option: provided => ({
      ...provided,
      color: '#000000',
      backgroundColor: '#FFFFFF'
    }),
    control: provided => ({
      ...provided,
      padding: "5px",
      backgroundColor: '#FFFFFF',
      borderRadius: '0px',
      border: 'none',
      borderBottom: '2px solid #ffffff',
      fontSize: "0.875rem",
    }),
    singleValue: provided => ({
      ...provided,
      color: 'black',
    })
  }

  return (
    
    <div className={`gfield  mb-3 gfield-${type} ${cssClass}`.trim()}>
      <label className="label text-white text-left" htmlFor={htmlId}>{`${label} ${isRequired ? " *" : " "}`}</label>
      <Select
        isMulti
        name={String(id)}
        inputId={htmlId}
        required={Boolean(isRequired)}
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        styles={customStyles}
        className={"text-sm text-left focus:border-[#ffffff]"}
      />
      {description ? <p className=" mt-2 text-xs opacity-70 field-description">{description}</p> : null}
      {fieldErrors?.length ? fieldErrors.map(fieldError => (
        <p key={fieldError.id} className="error-message">{fieldError.message}</p>
      )) : null}
    </div>
  );
}
