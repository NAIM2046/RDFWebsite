import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPublic from "../../Hook/useAxiosPublice";

const ProjectPartner = () => {
  const AxiosPublice = useAxiosPublic();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    reason: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.reason) newErrors.reason = "Please select a reason";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (formData.message.length > 200)
      newErrors.message = "Message must be less than 200 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    const templateParams = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      reason: formData.reason,
      message: formData.message,
    };

    try {
      const result = await AxiosPublice.post(
        "/api/email/sentEmail",
        templateParams
      );

      toast.success("Message sent successfully! We'll contact you soon.");

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        reason: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>RDF - Project Partner</title>
        <meta
          name="description"
          content="Partner with RDF to create sustainable change and transform lives"
        />
      </Helmet>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 font-serif mb-4">
            Partner With Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join hands with RDF to create sustainable change and transform
            lives. Together we can make a greater impact in communities around
            the world.
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex justify-center items-center">
            <div className="md:w-3/5 p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center ">
                Submit an Inquiry
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-1/2">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name*"
                      value={formData.firstName}
                      className={`w-full border ${
                        errors.firstName ? "border-red-500" : "border-gray-300"
                      } p-3 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition`}
                      onChange={handleChange}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div className="w-full sm:w-1/2">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name*"
                      value={formData.lastName}
                      className={`w-full border ${
                        errors.lastName ? "border-red-500" : "border-gray-300"
                      } p-3 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition`}
                      onChange={handleChange}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email*"
                    value={formData.email}
                    className={`w-full border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } p-3 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition`}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <select
                    name="reason"
                    value={formData.reason}
                    className={`w-full border ${
                      errors.reason ? "border-red-500" : "border-gray-300"
                    } p-3 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition appearance-none bg-white`}
                    onChange={handleChange}
                  >
                    <option value="">Reason for inquiry*</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="donation">Donation Inquiry</option>
                    <option value="volunteer">Volunteer Opportunity</option>
                    <option value="general">General Inquiry</option>
                  </select>
                  {errors.reason && (
                    <p className="mt-1 text-sm text-red-500">{errors.reason}</p>
                  )}
                </div>

                <div>
                  <textarea
                    name="message"
                    placeholder="Your message* (max 200 characters)"
                    value={formData.message}
                    rows="4"
                    className={`w-full border ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    } p-3 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition`}
                    onChange={handleChange}
                  ></textarea>
                  <div className="flex justify-between mt-1">
                    {errors.message ? (
                      <p className="text-sm text-red-500">{errors.message}</p>
                    ) : (
                      <p className="text-sm text-gray-500">
                        Briefly describe how you'd like to collaborate
                      </p>
                    )}
                    <p
                      className={`text-sm ${
                        formData.message.length > 180
                          ? "text-amber-500"
                          : "text-gray-500"
                      }`}
                    >
                      {formData.message.length}/200
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-lg text-lg font-semibold transition ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-md hover:shadow-lg"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Contact Us"
                  )}
                </button>
              </form>

              {/* Privacy Notice */}
              <p className="text-xs text-gray-500 mt-6 text-center">
                By submitting this form, you confirm you are over 18 and agree
                to receive emails about our work. You can opt out anytime. See
                our{" "}
                <a href="/privacy" className="text-green-600 hover:underline">
                  privacy policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPartner;
