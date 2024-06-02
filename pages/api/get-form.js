import { gql } from "@apollo/client";
import client from '../../lib/client'

import { ADDRESS_FIELD_FIELDS } from "../../components/GravityForms/GravityFormsFields/AddressField";
import { CHECKBOX_FIELD_FIELDS } from "../../components/GravityForms/GravityFormsFields/CheckboxField";
import { DATE_FIELD_FIELDS } from "../../components/GravityForms/GravityFormsFields/DateField";
import { EMAIL_FIELD_FIELDS } from "../../components/GravityForms/GravityFormsFields/EmailField";
import { MULTI_SELECT_FIELD_FIELDS } from "../../components/GravityForms/GravityFormsFields/MultiSelectField";
import { NAME_FIELD_FIELDS } from "../../components/GravityForms/GravityFormsFields/NameField";
import { PHONE_FIELD_FIELDS } from "../../components/GravityForms/GravityFormsFields/PhoneField";
import { RADIO_FIELD_FIELDS } from "../../components/GravityForms/GravityFormsFields/RadioField";
import { SELECT_FIELD_FIELDS } from "../../components/GravityForms/GravityFormsFields/SelectField";
import { TEXT_AREA_FIELD_FIELDS } from "../../components/GravityForms/GravityFormsFields/TextAreaField";
import { TEXT_FIELD_FIELDS } from "../../components/GravityForms/GravityFormsFields/TextField";
import { TIME_FIELD_FIELDS } from "../../components/GravityForms/GravityFormsFields/TimeField";
import { WEBSITE_FIELD_FIELDS } from "../../components/GravityForms/GravityFormsFields/WebsiteField";

const handler = async (req, res) => {
    try {
        const formId = parseInt(req.body.charAt(1))
        const { data } = await client.query({
            query: gql`
            query getForm($formId: ID!) {
                gfForm(id: $formId, idType: DATABASE_ID) {
                    title
                    description
                    submitButton {
                      text
                    }
                    confirmations {
                      isDefault
                      message
                    }
                    formFields {
                      nodes {
                        id
                        type
                        ... on AddressField {
                            ...AddressFieldFields
                        }
                        ... on CheckboxField {
                            ...CheckboxFieldFields
                        }
                        ... on DateField {
                            ...DateFieldFields
                        }
                        ... on EmailField {
                            ...EmailFieldFields
                        }
                        ... on MultiSelectField {
                            ...MultiSelectFieldFields
                        }
                        ... on NameField {
                            ...NameFieldFields
                        }
                        ... on PhoneField {
                            ...PhoneFieldFields
                        }
                        ... on RadioField {
                            ...RadioFieldFields
                        }
                        ... on SelectField {
                            ...SelectFieldFields
                        }
                        ... on TextField {
                            ...TextFieldFields
                        }
                        ... on TimeField {
                            ...TimeFieldFields
                        }
                        ... on WebsiteField {
                          ...WebsiteFieldFields
                        }
                        ... on TextAreaField {
                            ...TextAreaFieldFields
                        }
                      }
                      pageInfo {
                        hasNextPage
                        hasPreviousPage
                      }
                    }
                    pagination {
                        backgroundColor
                        color
                        hasProgressbarOnConfirmation
                        progressbarCompletionText
                        style
                        type
                        pageNames
                      }
                  }
            }
            ${ADDRESS_FIELD_FIELDS}
            ${CHECKBOX_FIELD_FIELDS}
            ${DATE_FIELD_FIELDS}
            ${EMAIL_FIELD_FIELDS}
            ${MULTI_SELECT_FIELD_FIELDS}
            ${NAME_FIELD_FIELDS}
            ${PHONE_FIELD_FIELDS}
            ${RADIO_FIELD_FIELDS}
            ${SELECT_FIELD_FIELDS}
            ${TEXT_FIELD_FIELDS}
            ${TIME_FIELD_FIELDS}
            ${WEBSITE_FIELD_FIELDS}
            ${TEXT_AREA_FIELD_FIELDS}
          `,
          variables: { 
            formId
            }
        })

        return res.status(200).json({
            result: data?.gfForm
        })

    }
    catch (e) {
        return res.status(400).json({
            error: "An error has occured, please try again."
        })
    }
}

export default handler