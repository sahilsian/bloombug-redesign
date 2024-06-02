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

interface Props {
  field: FormField;
  fieldErrors: FieldError[];
}

export default function GravityFormsField({ field, fieldErrors }: Props) {
  switch (field.type) {
    case "ADDRESS":
      return <div className="w-full mb-2"><AddressField field={field} fieldErrors={fieldErrors} /></div>;
    case "CHECKBOX":
      return <div className="w-full mb-2"><CheckboxField field={field} fieldErrors={fieldErrors} /></div>;
    case "DATE":
      return <div className="w-full mb-2"><DateField field={field} fieldErrors={fieldErrors} /></div>;
    case "EMAIL":
      return <div className="w-full mb-2"><EmailField field={field} fieldErrors={fieldErrors} /></div>;
    case "MULTISELECT":
      return <div className="w-full mb-2"><MultiSelectField field={field} fieldErrors={fieldErrors} /></div>;
    case "NAME":
      return <div className="w-full mb-2"><NameField field={field} fieldErrors={fieldErrors} /></div>;
    case "PHONE":
      return <div className="w-full mb-2"><PhoneField field={field} fieldErrors={fieldErrors} /></div>;
    case "RADIO":
      return <div className="w-full mb-2"><RadioField field={field} fieldErrors={fieldErrors} /></div>;
    case "SELECT":
      return <div className="w-full mb-2"><SelectField field={field} fieldErrors={fieldErrors} /></div>;
    case "TEXT":
      return <div className="w-full mb-2"><TextField field={field} fieldErrors={fieldErrors} /></div>;
    case "TEXTAREA":
      return <div className="w-full mb-2"><TextAreaField field={field} fieldErrors={fieldErrors} /></div>;
    case "TIME":
      return <div className="w-full mb-2"><TimeField field={field} fieldErrors={fieldErrors} /></div>;
    case "WEBSITE":
      return <div className="w-full mb-2"><WebsiteField field={field} fieldErrors={fieldErrors} /></div>;
    default:
      return <p>{`Field type not supported: ${field.type}.`}</p>;
  }
}
