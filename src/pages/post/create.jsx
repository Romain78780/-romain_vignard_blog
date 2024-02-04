import { descriptionValidator, nameValidator } from "@/utils/validators"
import Button from "@/web/components/ui/Button"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import { createResource } from "@/web/services/apiClient"
import { useMutation } from "@tanstack/react-query"
import { Formik } from "formik"
import { useRouter } from "next/router"
import { useCallback } from "react"
import { object } from "yup"

const validationSchema = object({
  name: nameValidator.required().label("Title"),
  description: descriptionValidator.required().label("Post description"),
})
const initialValues = {
  name: "",
  description: "",
  categoryId: 1,
}
const CreatePage = () => {
  const router = useRouter()
  const { mutateAsync: saveProduct } = useMutation({
    mutationFn: (product) => createResource("products", product),
  })
  const handleSubmit = useCallback(
    async ({ name, description, categoryId }) => {
      const { data: product } = await saveProduct({
        name,
        description,
        categoryId,
      })

      // Router.push(`/products/${product.id}`);
    },
    [saveProduct, router]
  )

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Create a Post</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <FormField
              name="name"
              label="Title"
              placeholder="Enter a title"
              className="mb-4"
            />
            <FormField
              name="description"
              label="Post description"
              placeholder="Enter a post"
              className="mb-4"
              textarea
            />
            <div className="text-center">
              <Button type="submit">Submit</Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default CreatePage
