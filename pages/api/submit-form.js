import { gql } from "@apollo/client";
import client from '../../lib/client'

const submitQuery = gql`
  mutation submitForm($id: ID!, $fieldValues: [FormFieldValuesInput]!) {
    submitGfForm(input: { id: $id, fieldValues: $fieldValues }) {
      errors {
        id
        message
      }
    }
  }
`

async function fetchAPI(query, { baseUrl, variables } = {}) {
  const res = await fetch(
    baseUrl || process.env.WORDPRESS_API_URL,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        variables,
      }),
    }
  );

  const json = await res.json();

  return json.data;
}

async function submitGravityForm({ id, fieldValues }) {
  const data = await fetchAPI(submitQuery, {
    baseUrl: process.env.WORDPRESS_API_URL,
    variables: { id: id, fieldValues: fieldValues },
  });

  return data?.submitGfForm;
}




const handler = async (req, res) => {
    try {
        const body = JSON.parse(req.body)
        const fieldValues = body.state
       
        const formId = body.id.toString()

        
        // await submitGravityForm(formId, fieldValues)

        const { data } = await client.mutate({
          mutation: submitQuery,
          variables: {
            id: formId,
            fieldValues: fieldValues
          }
        })

        return res.status(200).json({
          result: data
        })

    }
    catch (e) {
      return res.status(400).json({error: "An error has occured, please try again."});
    }
}

export default handler