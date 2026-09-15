import { use } from "react";
import { useState } from "react";

function Information() {
  const [text, setText] = useState("Dr. Elena Petrova");
  const [number, setNumber] = useState("+389 71 234 567");
  const [email, setEmail] = useState("anna.m@email.com");
  const [name, setName] = useState("Anna Markovic");

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 flex-1">
      <div>
        <p className="font-semibold text-sm">Personal Information</p>
      </div>

      <div className="grid grid-cols-2 gap-4 ">
        <div className="flex flex-col mt-2">
          <label for="username" className="text-sm text-blue-900">
            Full Name
          </label>
          <input
            className="border border-gray-300 rounded-xl px-6 py-2 bg-white text-sm text-black "
            type="text"
            name="username"
            placeholder=""
            onChange={() => {
              setName(event.target.value);
            }}
            value={name}
          />
        </div>
        <div className="flex flex-col">
          <label for="username" className="text-sm text-blue-900">
            Date of Birth
          </label>
          <input
            className="border border-gray-300 rounded-xl px-6 py-2 text-sm text-black bg-white"
            type="date"
            name="username"
            placeholder=""
          />
        </div>

        <div className="flex flex-col">
          <label for="username" className="text-sm text-blue-900">
            Email
          </label>
          <input
            className="border border-gray-300 rounded-xl px-6 py-2 text-sm text-black bg-white"
            type="text"
            name="username"
            placeholder=""
            onChange={() => {
              setEmail(event.target.value);
            }}
            value={email}
          />
        </div>
        <div className="flex flex-col">
          <label for="username" className="text-sm text-blue-900">
            Phone Number
          </label>
          <input
            className="border border-gray-300 rounded-xl px-6 py-2 text-sm text-black bg-white"
            type="text"
            name="username"
            placeholder=""
            onChange={(event) => {
              setNumber(event.target.value);
            }}
            value={number}
          />
        </div>

        <div className="flex flex-col">
          <p className="text-sm text-blue-900"> Residential area</p>
          <select className="border border-gray-300 rounded-xl px-6 py-2 text-sm text-black bg-white">
            <option value="all">North District</option>
            <option value="completed">South District</option>
            <option value="cancelled">Cantral</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label for="username" className="text-sm text-blue-900">
            Assigned family doctor
          </label>
          <input
            className="border border-gray-300 rounded-xl px-6 py-2 text-sm text-black bg-white"
            type="text"
            name="username"
            placeholder=""
            onChange={(event) => {
              setText(event.target.value);
            }}
            value={text}
          />
        </div>
      </div>
    </div>
  );
}
export default Information;
