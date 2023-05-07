import * as Yup from 'yup'
export const userSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("please enter your name"),
  phone: Yup.string()
  .matches(/^\d{11}$/, "Invalid phone number")
  .required("Phone number is required"),
  email: Yup.string().email().required("please enter valid email")
})
