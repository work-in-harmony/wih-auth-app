import React, { useState, useEffect } from "react";
import Logo from "../../components/Logo";
import SignUpForm from "./SignUpForm";
import CloudinaryImageUploader from "./CloudinaryImageUploader";
import { use } from "react";
import { SIGN_UP_URL, CLOUDINARY_WIDGET_URL } from "../../Urls"
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "dummy@email.com",
    password: "",
    profilePictureUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const [email, setEmail] = useState("");

  const navigate = useNavigate();



  // Load Cloudinary widget script
  useEffect(() => {

    setEmail(localStorage.getItem("email"));
    setFormData((prev) => ({
      ...prev,
      email: localStorage.getItem("email"),
    }));


    const script = document.createElement('script');
    script.src = CLOUDINARY_WIDGET_URL;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleImageUpload = (imageUrl) => {
    setFormData((prev) => ({
      ...prev,
      profilePictureUrl: imageUrl,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = "Full name is required";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/\d/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(SIGN_UP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          profilePictureUrl: formData.profilePictureUrl,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Sign up failed");

      console.log("Sign up successful:", data);

      // localStorage.removeItem("email");
      navigate("/login");

      // Redirect or show success message
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-wih-900)] text-[var(--color-wih-50)] flex flex-col">
      {/* Top Logo */}
      <Logo />

      {/* Signup Card */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-3xl bg-[var(--color-wih-800)] rounded-2xl p-12 shadow-lg">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-semibold mb-2">
              Welcome to WorkInHarmony! {formData.profilePictureUrl}
            </h1>
            <p className="text-[var(--color-wih-600)]">
              You're signing up as{" "}
              <span className="text-[var(--color-wih-50)]">
                {email}
              </span>
            </p>
          </div>

          {/* Profile Picture Upload */}
          {/* <div className="mb-8">
            <CloudinaryImageUploader
              onImageUpload={handleImageUpload}
              currentImageUrl={formData.profilePictureUrl}
            />
          </div> */}

          {/* Main Form */}
          <SignUpForm
            formData={formData}
            errors={errors}
            loading={loading}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleImageUpload={handleImageUpload}
            profilePictureUrl={formData.profilePictureUrl}
          />
        </div>
      </div>
    </div>
  );
}
