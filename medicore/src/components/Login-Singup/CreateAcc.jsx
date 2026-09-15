import { useState, useEffect } from "react";
import AuthTabs from "./AuthTabs";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../lib/axios";

function CreateAccount({ activeTab, setActiveTab }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [area, setArea] = useState("Central ");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("pateint");
  const navigate = useNavigate();

  const handleCreateAcc = async () => {
    setError("");
    setMessage("");

    try {
      const response = await axios.post("/register", {
        full_name: name,
        email: email,
        phone: phone,
        date_of_birth: date,
        area: area,
        password: password,
        role: role,
      });
      navigate("/");
      setMessage(" successful!");
      console.log("Success! Backend sent back:", response.data);
    } catch (error) {
      console.log("Full error object:", error);
      setMessage(
        error.response?.data?.message ||
          " Registration failed. Check your console.",
      );
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center h-full align-middle ">
        <div className="w-full  flex justify-center mb-3">
          <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="flex flex-col px-30">
          <div className="mt-5">
            <p className="font-semibold text-xl">Create your account.</p>
            <p className="text-gray-700 text-sm">
              Register as a patient and get matched with a family doctor.
            </p>
          </div>
          <div className="flex flex-col mt-5">
            <div className="flex flex-col">
              <label for="username" className="text-sm text-blue-900">
                Full name
              </label>
              <input
                className="border border-gray-300 rounded-xl px-6 py-2 bg-white text-sm text-black "
                type="text"
                name="username"
                placeholder=""
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <div className="flex flex-row gap-3 mt-2">
                <div>
                  <p className="text-sm text-blue-900">Email</p>
                  <input
                    className="border border-gray-300 rounded-xl px-8 py-2 bg-white text-sm text-black "
                    type="email"
                    name="username"
                    placeholder=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <p className="text-sm text-blue-900">Phone</p>
                  <input
                    className="border border-gray-300 rounded-xl px-8 py-2 bg-white text-sm text-black "
                    type="tel"
                    name="username"
                    placeholder=""
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex  gap-5 mt-2">
                <div>
                  <p className="text-sm text-blue-900">Date of birth</p>
                  <input
                    className="border border-gray-300 rounded-xl px-16 py-2 bg-white text-sm text-black "
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="flex flex-col ">
                  <p className="text-sm text-blue-900"> Residential area</p>
                  <select
                    className="border border-gray-300 rounded-xl px-16 py-2 text-sm text-black bg-white"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}>
                    <option value="North District ">North District</option>
                    <option value="South District">South District</option>
                    <option value="Central">Central</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="flex flex-col mt-2">
                  <label for="username" className="text-sm text-blue-900">
                    Password
                  </label>
                  <input
                    className="border border-gray-300 rounded-xl px-6 py-2 bg-white text-sm text-black "
                    type="password"
                    name="username"
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <div className="flex justify-center mt-3 bg-blue-900 p-2 rounded-sm text-white">
                    <button type="button" onClick={handleCreateAcc}>
                      Create account
                    </button>
                  </div>
                  <div className="flex justify-center mt-1">
                    <p className="text-sm text-blue-950">
                      By signing up, you agree to our terms and privacy policy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CreateAccount;
