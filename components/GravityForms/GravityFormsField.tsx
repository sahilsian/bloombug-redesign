import { FormField, FieldError } from "../../generated/graphql";
import AddressField from "./GravityFormsFields/AddressField";
import CheckboxField from "./GravityFormsFields/CheckboxField";
import DateField from "./GravityFormsFields/DateField";
import EmailField from "./GravityFormsFields/EmailField";
import MultiSelectField from "./GravityFormsFields/MultiSelectField";
import NameField from "./GravityFormsFields/NameField";
import PhoneField from "./GravityFormsFields/PhoneField";
import RadioField from "./GravityFormsFields/RadioField";
import SelectField from "./GravityFormsFields/SelectField";
import TextField from "./GravityFormsFields/TextField";
import TextAreaField from "./GravityFormsFields/TextAreaField";
import TimeField from "./GravityFormsFields/TimeField";
import WebsiteField from "./GravityFormsFields/WebsiteField";
import NumberField from "./GravityFormsFields/NumberField";

interface Props {
  field: FormField;
  fieldErrors: FieldError[];
}

export default function GravityFormsField({ field, fieldErrors }: Props) {
  switch (field.type) {
    case "ADDRESS":
      return <div className="w-full"><AddressField field={field} fieldErrors={fieldErrors} /></div>;
    case "CHECKBOX":
      return <div className="w-full"><CheckboxField field={field} fieldErrors={fieldErrors} /></div>;
    case "DATE":
      return <div className="w-full"><DateField field={field} fieldErrors={fieldErrors} /></div>;
    case "EMAIL":
      return <div className="w-full"><EmailField field={field} fieldErrors={fieldErrors} /></div>;
    case "MULTISELECT":
      return <div className="w-full"><MultiSelectField field={field} fieldErrors={fieldErrors} /></div>;
    case "NAME":
      return <div className="w-full "><NameField field={field} fieldErrors={fieldErrors} /></div>;
    case "PHONE":
      return <div className="w-full"><PhoneField field={field} fieldErrors={fieldErrors} /></div>;
    case "RADIO":
      return <div className="w-full "><RadioField field={field} fieldErrors={fieldErrors} /></div>;
    case "SELECT":
      return <div className="w-full"><SelectField field={field} fieldErrors={fieldErrors} /></div>;
    case "TEXT":
      return <div className="w-full"><TextField field={field} fieldErrors={fieldErrors} /></div>;
    case "TEXTAREA":
      return <div className="w-full"><TextAreaField field={field} fieldErrors={fieldErrors} /></div>;
    case "TIME":
      return <div className="w-full"><TimeField field={field} fieldErrors={fieldErrors} /></div>;
    case "WEBSITE":
      return <div className="w-full"><WebsiteField field={field} fieldErrors={fieldErrors} /></div>;
    case "NUMBER":
      return <div className="w-full"><NumberField field={field} fieldErrors={fieldErrors} /></div>;
    default:
      return <p>{`Field type not supported: ${field.type}.`}</p>;
  }
}
