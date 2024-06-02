import { GravityFormsForm as GravityFormsFormType } from "../../generated/graphql";
import { GravityFormProvider } from "../../hooks/useGravityForm";
import GravityFormsForm from "./GravityFormsForm";

interface Props {
  form: GravityFormsFormType;
  id: number;
}

export default function GravityForm(props: Props) {
  return (
    <GravityFormProvider>
      <GravityFormsForm {...props} />
    </GravityFormProvider>
  );
}
