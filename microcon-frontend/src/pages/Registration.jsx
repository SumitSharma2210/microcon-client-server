import React, { useState } from "react";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    institution: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: formData.name,
            email: formData.email,
            category: formData.category,
            institution: formData.institution,
            phone: formData.phone,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      alert("✅ You have successfully registered with us!");
      setFormData({
        name: "",
        email: "",
        category: "",
        institution: "",
        phone: "",
      });
    } catch (error) {
      alert("❌ Registration failed: " + error.message);
    }
  };

  return (
    <div className="bg-white py-12 px-4 max-w-xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        Registration Form
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email Address</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select...</option>
            <option value="IAMM Member">IAMM Member</option>
            <option value="Non-Member">Non-Member</option>
            <option value="PG Student">PG Student</option>
          </select>
        </div>

        {/* Institution */}
        <div>
          <label className="block mb-1 font-medium">
            Institution / Organization
          </label>
          <input
            type="text"
            name="institution"
            required
            value={formData.institution}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* phone */}
        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit */}
        <div className="text-center pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
