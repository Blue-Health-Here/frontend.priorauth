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
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain special character')
    .test('different-from-current', 'New password must be different from current password', function(value) {
      const { currentPassword } = this.parent;
      if (!value || !currentPassword) return true; 
      return value !== currentPassword;
    }),
  confirmPassword: Yup.string()
    .required('Please confirm your new password')
});

export const pharmacyValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  location: Yup.string().required("Location is required")
})


export const userValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),

  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),

  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10,15}$/, 'Phone number must be 10 to 15 digits'),

  whatsapp: Yup.string()
    .matches(/^[0-9]{10,15}$/, 'WhatsApp number must be 10 to 15 digits')
    .nullable(),

  gender: Yup.string()
    .required('Gender is required'),

  address: Yup.string()
    .required('Address is required')
    .min(5, 'Address must be at least 5 characters'),
});

export const modifyPrescriberSchema = Yup.object().shape({
  prescriber: Yup.string().required("Name is required"),
  prescriberPhone: Yup.string().required("Phone is required"),
  prescriberCity: Yup.string().required("City is required"),
  npi: Yup.string().required("NPI is required"),
  fax: Yup.string(),
  prescriberAddress: Yup.string().required("Address is required"),
});