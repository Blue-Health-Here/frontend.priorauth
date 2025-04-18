import * as Yup from "yup";

export const signInValidationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
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