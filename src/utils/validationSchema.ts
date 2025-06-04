import * as Yup from "yup";

export const signInValidationSchema = Yup.object({
  userName: Yup.string().required("Username is required"),
  // email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const contactUsValidationSchema = Yup.object().shape({
  fullname: Yup.string()
    .required("Full name is required")
    .min(3, "Full name must be at least 3 characters"),

  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{10,15}$/, "Phone number must be 10 to 15 digits"),

  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),

  message: Yup.string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters"),
});

export const changePasswordValidationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required('Current password is required'),
  newPassword: Yup.string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain lowercase letter')
    .matches(/[A-Z]/, 'Password must contain uppercase letter')
    .matches(/\d/, 'Password must contain a number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain special character'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm your new password'),
});

export const pharmacyValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{10,15}$/, "Phone number must be 10 to 15 digits"),
  location: Yup.string().required("Location is required")
})

