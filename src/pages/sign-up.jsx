import { emailValidator, passwordValidator, usernameValidator } from "@/utils/validators"
import Alert from "@/web/components/ui/Alert"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import SubmitButton from "@/web/components/ui/SubmitButton"
import { createResource } from "@/web/services/apiClient"
import { useMutation } from "@tanstack/react-query"
import { Formik } from "formik"
import { object } from "yup"

const initialValues = {
  email: "",
  password: "",
  username: "", 
}
const validationSchema = object({
  email: emailValidator.required().label("E-mail"),
  password: passwordValidator.required().label("Password"),
  username: usernameValidator.required().label("Username"), 
})
const SignUpPage = () => {
  const { mutateAsync, isSuccess } = useMutation({
    mutationFn: (data) => createResource("users", data),
  })
  const handleSubmit = async ({ email, password, username }) => {
    await mutateAsync({ email, password, username })
  }

  if (isSuccess) {
    return (
      <Alert>
        We have sent you a validation link! Please check your spam too~!
      </Alert>
    )
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormField
          name="email"
          type="email"
          placeholder="Enter your e-mail"
          label="E-mail"
        />
        <FormField
          name="password"
          type="password"
          placeholder="Enter your password"
          label="Password"
        />
        <FormField
          name="username"
          type="text"
          placeholder="Choose a username"
          label="Username"
        />
        <SubmitButton>Sign Up</SubmitButton>
      </Form>
    </Formik>
  )
}

export default SignUpPage
