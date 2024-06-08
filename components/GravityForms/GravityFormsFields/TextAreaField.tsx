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
    conditionalLogic {
      actionType
      logicType
      rules {
        fieldId
        value
        operator
      }
    }
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
  const { id, type, label, conditionalLogic, description, cssClass, placeholder, isRequired } = field;
  const htmlId = `field_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find((fieldValue: FieldValue) => fieldValue.id === id) as StringFieldValue | undefined;
  const value = fieldValue?.value || DEFAULT_VALUE;

  function checkConditionalLogic() {
    if (!conditionalLogic) return true

    return conditionalLogic.rules.every(rule => {
      const targetField = state.find(f => f.id === rule.fieldId)
      if (!targetField) return false

      //@ts-ignore
      const targetValue = targetField.checkboxValues.find(cv => cv.value === rule.value)
      
      return rule.operator === "IS" ? Boolean(targetValue) : !targetValue
    })
  }

  const shouldShowField = checkConditionalLogic()
  return (
    <>
    {shouldShowField &&
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
      {description ? <p className="field-description text-sm mt-2 text-[#00000086]">{description}</p> : null}
      {fieldErrors?.length ? fieldErrors.map(fieldError => (
        <p key={fieldError.id} className="error-message">{fieldError.message}</p>
      )) : null}
    </div>
    }
    </>
  );
}
