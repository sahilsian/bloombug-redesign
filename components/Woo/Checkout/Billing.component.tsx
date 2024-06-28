// Imports
import {
  SubmitHandler,
  useForm,
  useFormContext,
  FormProvider,
} from 'react-hook-form';

// Components
import { InputField } from '../Input/InputField.component';
import Button from '../UI/Button.component';

// Constants
import { INPUT_FIELDS } from '../../../lib/constants/INPUT_FIELDS';
import { ICheckoutDataProps } from '../../../lib/functions/functions';

interface IBillingProps {
  handleFormSubmit: SubmitHandler<ICheckoutDataProps>;
}

const OrderButton = () => {
  const { register } = useFormContext();

  return (
    <div className="w-full p-2">
      <input
        placeholder="paymentMethod"
        type="hidden"
        value="cod"
        checked
        {...register('paymentMethod')}
      />
      <div className="mt-4 flex justify-center">
        <Button>Purchase Now</Button>
      </div>
    </div>
  );
};

const Billing = ({ handleFormSubmit }: IBillingProps) => {
  const methods = useForm<ICheckoutDataProps>();

  return (
    <section className="text-gray-700 container p-4 py-2 mx-auto">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
          <div className="mx-auto lg:w-1/2 flex flex-wrap">
            {INPUT_FIELDS.map(({ id, label, name, customValidation }) => (
              <InputField
                key={id}
                inputLabel={label}
                inputName={name}
                customValidation={customValidation}
              />
            ))}
            <OrderButton />
          </div>
        </form>
      </FormProvider>
    </section>
  );
};

export default Billing;
