import { gql } from "@apollo/client"

import useGravityForm, { ACTION_TYPES } from "../../../hooks/useGravityForm"

export const CHECKBOX_FIELD_FIELDS = gql`
  fragment CheckboxFieldFields on CheckboxField {
    id
    label
    conditionalLogic {
      actionType
      logicType
      rules {
        fieldId
        value
        operator
      }
    }
    visibility
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
`

const DEFAULT_VALUE = []

export default function CheckboxField({ field, fieldErrors }) {
  const {
    id,
    type,
    label,
    visibility,
    conditionalLogic,
    description,
    cssClass,
    inputs,
    isRequired,
    choices
  } = field

  const checkboxInputs =
    choices?.map((choice, index) => ({ ...choice, id: inputs?.[index]?.id })) ||
    []
  const htmlId = `field_${id}`
  const { state, dispatch } = useGravityForm()

  const fieldValue = state.find(fieldValue => fieldValue.id === id)
  //@ts-ignore
  const checkboxValues = fieldValue?.checkboxValues || DEFAULT_VALUE

  function handleChange(event) {
    const { name, value, checked } = event.target
    const otherCheckboxValues = checkboxValues.filter(
      checkboxValue => checkboxValue.inputId !== Number(name)
    )
    const newCheckboxValues = checked
      ? [...otherCheckboxValues, { inputId: Number(name), value }]
      : otherCheckboxValues

    dispatch({
      type: ACTION_TYPES.updateCheckboxFieldValue,
      fieldValue: {
        id,
        checkboxValues: newCheckboxValues
      }
    })
  }

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
      {shouldShowField && (
        <fieldset
          id={htmlId}
          className={`gfield text-left mb-3 gfield-${type} ${cssClass}`.trim()}
        >
          <legend className="text-left label mb-3">{`${label} ${
            isRequired ? " *" : " "
          }`}</legend>
          {checkboxInputs.map(({ id: inputId, text, value }) => (
            <div key={inputId} className="py-1">
              <input
                type="checkbox"
                name={String(inputId)}
                required={Boolean(isRequired)}
                id={`input_${id}_${inputId}`}
                value={String(value)}
                onChange={handleChange}
              />
              <label
                className="pl-4 text-lg"
                htmlFor={`input_${id}_${inputId}`}
              >
                {text}
              </label>
            </div>
          ))}
          {description ? (
            <p className="field-description text-sm mt-2 text-[#00000086]">
              {description}
            </p>
          ) : null}
          {fieldErrors?.length
            ? fieldErrors.map(fieldError => (
                <p key={fieldError.id} className="error-message">
                  {fieldError.message}
                </p>
              ))
            : null}
        </fieldset>
      )}
    </>
  )
}
