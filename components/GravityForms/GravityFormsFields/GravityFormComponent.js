import GravityForm from '../GravityForm';
import { useEffect, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import siteConfig from '../../../site.config';

export const GravityFormsComponent = ( { formId }) => {
    const [form, setForm] = useState()
    const getForm = async() => {
        const response = await fetch(`/api/get-form`, {
            method: "POST",
            body: JSON.stringify(formId),
        });
        const data = await response.json();
        setForm(data.result)
    }

    useEffect(()=> {
        getForm()
    }, [])
    return (
        form ? (
        <div className='rounded-lg'>
            <GravityForm id={formId} form={form} />
        </div>
        )
        :
        (
            <div className='flex justify-center'>
                <ClipLoader
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
                color={siteConfig.colors.solids.primary}
                ></ClipLoader>
            </div>
        )
    )
}