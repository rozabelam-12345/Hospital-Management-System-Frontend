# Medicore — Frontend Architecture Guide

This is a guide for restructuring the React app so it stays maintainable as it grows past a handful of pages. It's written for a junior dev, so it explains **why**, not just **what**. Nothing in your code has been changed — this is a reference for you to apply yourself.

---

## 1. What the project looks like today

Stack: React 19 + Vite, `react-router-dom` v7, Tailwind v4, `@heroui/react` (installed, not yet used), `axios`. No TypeScript, no test runner, no state library.

Reading through `src/`, a few patterns repeat and are worth fixing before the app gets bigger:

- **No separation between "fetch data" and "render UI".** In [SignIn.jsx](src/components/Login-Singup/SignIn.jsx), the `axios.post` call, the loading/error state, and the JSX all live in the same component. Every new screen that talks to the API will re-invent this by hand.
- **Data and layout are duplicated.** [Layout.jsx](src/Layout.jsx) defines `Header + Sidebar + <Outlet />`, but [App.jsx](src/App.jsx) never uses it — instead, [Dashboard.jsx](src/pages/patient/Dashboard.jsx) manually re-imports `Header` and `Sidebar` and repeats the same wrapper markup. If you tweak the layout, you now have to edit it in N places.
- **Components are grouped by *page*, not by *feature*.** `src/components/Login-Singup/`, `src/components/Dashboard-Components/`, `src/components/History-Components/` — folder names are inconsistent (mixed case, mixed separators) and a component can only be found if you already know which page uses it.
- **No shared UI primitives.** The input styling in `SignIn.jsx` (`border border-gray-300 rounded-xl px-6 py-2 ...`) is retyped by hand everywhere a form appears. When the design changes, you'll be find-and-replacing across dozens of files.
- **Mock data is hardcoded inside components.** [Appointments.jsx](src/components/Dashboard-Components/Appointments.jsx) has three appointments typed directly into the JSX. There's no clear line where "real data" would plug in.
- **API base URL is hardcoded.** [axios.js](src/api/axios.js) points at `http://localhost:8000/api/v1` directly, so switching between local/staging/prod means editing source code.
- **No route protection / role handling**, even though `SignIn.jsx` already branches on `admin` / `doctor` / `patient` roles.

None of this is "wrong" for a first pass — it's completely normal for a project that started as a prototype. The rest of this doc is the plan for cleaning it up.

---

## 2. Target architecture: feature-based

There are a few well-known ways to organize a React app. For a project this size, the right pick is a **feature-based structure**: files are grouped by what business capability they serve (patients, appointments, auth) rather than by technical type (all components together, all pages together) or left ungrouped.

Why this one specifically:

| Option | Verdict |
|---|---|
| **Flat `components/` + `pages/`** (what you have now) | Fine for a 5-page demo. Breaks down once you have 20+ components — nothing tells you what belongs together. |
| **Feature-based** (recommended) | Each feature folder is self-contained: its API calls, hooks, and components live together. Deleting a feature means deleting one folder. This is the sweet spot for small-to-mid apps and is easy to explain to any teammate. |
| **Feature-Sliced Design (FSD)** | A stricter, more formal version of feature-based with enforced layers (`app/pages/widgets/features/entities/shared`) and import rules. Very good for large teams/apps, but it's overhead you don't need yet. Worth reading once you outgrow the simpler version — see [feature-sliced.design](https://feature-sliced.design). |

### Target folder tree

```
src/
  app/                    # app shell: providers, router config — not business logic
    routes.jsx
    providers.jsx

  pages/                  # one file per route. THIN — just compose features.
    admin/
    doctor/
    patient/
    auth/

  features/               # one folder per business capability
    patients/
      api.js              # axios calls for this resource only
      hooks.js            # custom hooks: usePatients(), useCreatePatient() ...
      components/
        PatientTable.jsx
        PatientForm.jsx
      index.js            # re-exports the public pieces of this feature
    appointments/
    symptoms/
    auth/

  components/             # shared, dumb, reusable UI — no API calls, no feature logic
    ui/
      Button.jsx
      Input.jsx
      Modal.jsx
      Card.jsx
    layout/
      Header.jsx
      Sidebar.jsx
      DashboardLayout.jsx

  context/                # global app state (current user/session, theme)
    AuthContext.jsx

  hooks/                  # generic reusable hooks, not tied to one feature
    useDebounce.js

  lib/
    axios.js              # the shared axios instance (moved from src/api/)

  utils/                  # pure helper functions (formatDate, roleLabel, ...)

  assets/
```

**Rule of thumb for where new code goes:** if it's specific to one business concept (patients, appointments, symptoms) it goes in `features/<name>/`. If it's a generic building block used everywhere (a button, a modal, a date formatter), it goes in `components/ui/` or `utils/`. If it's a full page reachable by a URL, it goes in `pages/` and should mostly just import from `features/`.

### Naming conventions to adopt

- Folders: lowercase, hyphen-separated (`login-signup`, not `Login-Singup`).
- Component files: `PascalCase.jsx` (already mostly followed — a few files like `hist-page-head.jsx` and `chechk-symptoms.jsx` don't match; worth a rename pass, and mind the typos while you're there).
- Non-component files (`api.js`, `hooks.js`, `utils.js`): `camelCase.js`.
- One default export per component file, named the same as the file.

---

## 3. The three layers of a feature

This is the core idea to internalize — every feature that talks to the backend should be split into three layers. This is what turns "CRUD" from a copy-pasted mess into a predictable pattern you repeat for every resource (patients, appointments, doctors, ...).

```
components/   →  calls hooks, renders JSX. Knows nothing about axios.
     ↑
   hooks.js   →  owns loading/error/data state, calls api.js, exposes a clean interface.
     ↑
    api.js    →  pure functions that wrap axios calls. Knows nothing about React.
```

Why bother splitting these up instead of writing it all in the component (like `SignIn.jsx` does today)?

- **`api.js` is testable and reusable** without rendering anything — it's just functions that take arguments and return promises.
- **`hooks.js` is where loading/error state logic lives once**, instead of every component reinventing `useState` for `isLoading`/`error`.
- **Components stay declarative.** They ask a hook for `{ patients, isLoading, error }` and render — they don't know or care what `axios` is.

This mirrors the pattern used in [bulletproof-react](https://github.com/alan2207/bulletproof-react) (a widely-referenced example repo for exactly this kind of structure — worth skimming its `src/features` folder).

---

## 4. State management: what to use, when

Don't reach for a state library by default — most of what looks like "global state" in this app is actually **server state** (data that lives in your database, not in the browser). React itself, plus one pattern, covers almost everything you need:

1. **Local component state** (`useState`) — for things that only one component cares about: a form field, whether a modal is open.
2. **Context** (`React.createContext`) — for truly global, rarely-changing app state. In this app, that's exactly one thing: the logged-in user/role (`AuthContext`). Don't put server data (patients, appointments) in Context — it goes stale and causes unnecessary re-renders across the whole tree.
3. **The feature hook pattern above (`hooks.js`)** — for server state: patients, appointments, symptoms. Each feature owns its own fetching/caching.

**Optional upgrade, once you're comfortable with the pattern above:** install [TanStack Query](https://tanstack.com/query/latest) (`npm install @tanstack/react-query`). It replaces the hand-rolled `useState`/`useEffect` loading-and-error dance in `hooks.js` with `useQuery`/`useMutation`, and gives you caching, automatic refetching, and request de-duplication for free. It's the de facto standard for server state in React apps today. The CRUD example below is written with plain hooks first (zero new dependencies) — once it feels repetitive, that repetition is exactly what React Query removes. Its docs have a very good tutorial if you want to convert the example afterward.

Don't reach for Redux/Zustand here — this app doesn't have enough genuinely global client state to justify it.

---

## 5. Routing — implemented

`react-router-dom` v7 supports nested routes: a layout route renders `<Outlet />` for its children, so `Header`/`Sidebar` mount once instead of per-page. `Layout.jsx` was renamed and moved to `components/layout/DashboardLayout.jsx` (its `Sidebar`/`Header` imports updated from `./components/Sidebar` to `../Sidebar` to account for the move), and a second layout route, `ProtectedRoute`, wraps it to gate access behind login.

### `src/context/AuthContext.jsx`

Holds "who is logged in" as global state — the one thing in this app that genuinely belongs in Context rather than a feature's `hooks.js` (see section 4). Persists to `localStorage` so a refresh doesn't lose the session.

```jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  function login(userData) {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
```

Mounted once, wrapping the whole app, in `main.jsx`:

```jsx
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
);
```

### `src/app/ProtectedRoute.jsx`

Reads `user` from `AuthContext` and either renders `<Outlet />` (let the requested page through) or redirects to `/login`.

```jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
```

### `src/App.jsx` — the actual route tree

`ProtectedRoute` wraps `DashboardLayout`, so the login check happens before the header/sidebar even render. `/login` and the `*` 404 route stay outside both, since neither should show the dashboard shell or require a session.

```jsx
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./app/ProtectedRoute";

import Dashboard from "./pages/patient/Dashboard";
import Profile from "./pages/patient/My-profile";
import Symptoms from "./pages/patient/Symptoms-analysis";
import Historytest from "./pages/patient/History-records";

import Overview from "./pages/admin/Overview";
import Patients from "./pages/admin/Patients";

import DocDashboard from "./pages/doctor/DoctorDashboard";

import EntryPage from "./pages/login-logout/EntryPage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<EntryPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/symptoms" element={<Symptoms />} />
          <Route path="/history" element={<Historytest />} />
          <Route path="/admin/patients" element={<Patients />} />
        </Route>
      </Route>

      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  );
}
```

`Overview` and `DocDashboard` are still imported but not yet wired to a route — same pre-existing gap as before, unrelated to this migration; wire them in the same way once admin/doctor dashboards are built.

### Bearer tokens: `lib/axios.js` attaches one to every request

The backend (Laravel + Sanctum, identified by its token format — a number, a `|`, then a long string, e.g. `19|KGUJ6PLhoGMb0PSpzZ1GIBGR5JBmfeup8tfZMBgX1e449c99`) requires an `Authorization: Bearer <token>` header on protected routes like `/admin/patients`. Rather than attaching it manually in every feature's `api.js`, it's attached once, centrally, via an axios **request interceptor** on the shared instance:

```js
// src/lib/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
```

Only one `export default` may exist in this file — replace the old `export default axios.create({...})` entirely rather than appending this below it (a real mistake made while building this: leaving both in caused a build error, "A module cannot have multiple default exports").

`AuthContext.jsx`'s `login()` now takes a second argument and persists both pieces:

```jsx
function login(userData, token) {
  setUser(userData);
  localStorage.setItem("user", JSON.stringify(userData));
  if (token) {
    localStorage.setItem("token", token);
  }
}

function logout() {
  setUser(null);
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}
```

(`localStorage` is used here — not just `AuthContext`'s in-memory state — specifically because `lib/axios.js` is a plain module, not a React component, so it can't call `useAuth()`; `localStorage` is the one place both a React component and a plain axios file can both reach.)

### `SignIn.jsx` calls `login()` on success

`ProtectedRoute` only lets someone through once `AuthContext`'s `user` is non-null, so the login form has to be the thing that sets it:

```jsx
const { login } = useAuth(); // alongside the other hooks in SignIn

const handleLogin = async () => {
  setError("");
  setMessage("");

  try {
    const response = await axios.post("/login", {
      email: email,
      password: password,
    });

    const payload = response.data.data;
    const loggedInUser = payload.user;
    const token = payload.token;
    login(loggedInUser, token);

    navigate("/");
  } catch (error) {
    console.log("Full error object:", error);
    setMessage(
      error.response?.data?.message || "Login failed. Check your console.",
    );
  }
};
```

**Why `response.data.data` and not `response.data`:** this backend wraps its whole response in an extra `data` envelope — the real shape is `{ data: { user: {...}, token: "..." } }`, not `{ user: {...}, token: "..." }` directly. The original code (`response.data.user || response.data`) didn't account for that extra layer, silently fell through to its fallback, and ended up saving the *entire* wrapper object as if it were the user. If your backend's response shape ever changes, re-check this against the real `login` response body in the Network tab rather than assuming — this exact mismatch cost a long debugging session.

This also replaces the original role-based redirect (`navigate("/admin-dashboard")`, `/doctor-dashboard`, `/patient-dashboard`) — none of those paths existed in `App.jsx`'s actual routes, so an admin/doctor logging in was landing on the 404 page. Once dedicated admin/doctor dashboard routes exist, role-based redirects can come back, driven by `loggedInUser.role`.

### Diagnosing auth errors: 401 vs. 403-style role errors

Two different failures look similar but mean different things and need different fixes:

- **`{"errors":{"auth":["Unauthenticated."]}}`** (Laravel's default wording) — the request has no valid token at all, or the token isn't being sent. Check: is there a `token` in Local Storage? Is the `Authorization` header actually present on the request (DevTools → Network → click the request → Headers tab)?
- **`{"errors":{"role":["You are not authorized to access this resource."]}}`** — the token *is* valid and the backend knows who you are, but that account's `role` isn't allowed to access this specific route. This is not a bug — it's the backend correctly rejecting, say, a `role: "patient"` account from an admin-only endpoint. The fix is logging in with an account that has the right role, not changing any code.

### Testing this without a live backend

`ProtectedRoute` can be satisfied for manual testing even without a working `/login` endpoint: in the browser DevTools → Application → Local Storage → `http://localhost:5173`, add key `user` with a value like `{"id":1,"name":"Test Admin","role":"admin"}`, then refresh. This lets you verify routing/layout/the Patients CRUD screen independently of backend readiness — remove the entry afterward so you're not stuck in a fake session. (Note this bypasses `ProtectedRoute`'s check but not the backend's own auth — API calls will still 401 without a real `token` too.)

---

## 6. Environment variables

Move the hardcoded API URL out of source so you can point at different backends without editing code:

```js
// lib/axios.js
import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
```

```bash
# .env  (add to .gitignore — don't commit machine-specific values)
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

Vite only exposes env vars prefixed with `VITE_` to client code — that's a Vite security feature, not a typo.

---

## 7. Migration plan — progress

You don't need a big-bang rewrite. Status so far:

- [x] Add the new folders (`app/`, `features/`, `context/`, `lib/`, `components/ui/`, `components/layout/`) alongside the existing ones.
- [x] Move `src/api/axios.js` → `src/lib/axios.js`, wire up the `.env` change (`VITE_API_BASE_URL`).
- [x] Build one feature end-to-end using the pattern in section 8 — `features/patients/` (`api.js`, `hooks.js`, `fields.js`, `components/PatientTable.jsx`), plus the shared `components/ui/{Input,Select,Button,Modal,Form}.jsx` primitives and `pages/admin/Patients.jsx`. Route live at `/admin/patients`.
- [x] Wire `Layout.jsx` into actual routing — moved/renamed to `components/layout/DashboardLayout.jsx`, nested under it in `App.jsx` via a layout route, and the manual `Header`/`Sidebar` duplication removed from `pages/patient/Dashboard.jsx` (and swept across the other patient pages).
- [x] Add `AuthContext` + `ProtectedRoute` (section 5) — `SignIn.jsx` now calls `login()` on success; unauthenticated visitors are redirected to `/login`.
- [ ] Pull the repeated input/button styling out of `CreateAcc.jsx` (still has hand-typed Tailwind classes and the dead `error`/`message`/`role` state noted in section 1) into the shared `components/ui/*` primitives.
- [ ] Repeat the `features/patients/` pattern for the next resource (doctors, appointments, ...) — copy `api.js`/`hooks.js`/`fields.js`, reuse `components/ui/Form.jsx` and `Modal.jsx` as-is.
- [ ] Wire `Overview` (admin) and `DocDashboard` (doctor) — both still imported in `App.jsx` but have no route yet.

---

## 8. Worked example: Patients CRUD

This is the reference implementation for the pattern in section 3 — a full create/read/update/delete flow for a "Patients" resource, styled consistently with your existing Tailwind usage (`blue-900`, `rounded-xl`, `border-gray-200`). Treat this as the template to copy for every other resource (appointments, doctors, ...).

### 8.1 `features/patients/api.js` — the API layer

Pure functions, no React, no component state. Each one wraps a single axios call.

```js
// src/features/patients/api.js
import axios from "../../lib/axios";

export function getPatients(params) {
  return axios.get("/patients", { params }).then((res) => res.data);
}

export function getPatient(id) {
  return axios.get(`/patients/${id}`).then((res) => res.data);
}

export function createPatient(payload) {
  return axios.post("/patients", payload).then((res) => res.data);
}

export function updatePatient(id, payload) {
  return axios.put(`/patients/${id}`, payload).then((res) => res.data);
}

export function deletePatient(id) {
  return axios.delete(`/patients/${id}`).then((res) => res.data);
}
```

### 8.2 `features/patients/hooks.js` — the state layer

This is the one place `isLoading`/`error` bookkeeping is written. Every component that needs patients uses `usePatients()` instead of duplicating `useEffect` + `useState` boilerplate.

```js
// src/features/patients/hooks.js
import { useCallback, useEffect, useState } from "react";
import {
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
} from "./api";

export function usePatients() {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load patients.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { patients, isLoading, error, refetch };
}

// Separate hook for mutations, so components only pull in what they use.
export function usePatientMutations({ onSuccess } = {}) {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  async function save(patient) {
    setIsSaving(true);
    setError(null);
    try {
      const result = patient.id
        ? await updatePatient(patient.id, patient)
        : await createPatient(patient);
      onSuccess?.(result);
      return result;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save patient.");
      throw err;
    } finally {
      setIsSaving(false);
    }
  }

  async function remove(id) {
    setIsSaving(true);
    setError(null);
    try {
      await deletePatient(id);
      onSuccess?.();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete patient.");
      throw err;
    } finally {
      setIsSaving(false);
    }
  }

  return { save, remove, isSaving, error };
}
```

> **If you later add TanStack Query**, this whole file shrinks to two `useQuery`/`useMutation` calls and you get caching/refetch-on-focus for free. Good file to revisit once you've tried the library.

### 8.3 Shared UI primitives

Pulled out once, reused everywhere — this is what removes the copy-pasted `border border-gray-300 rounded-xl px-6 py-2 ...` you currently have in every form.

```jsx
// src/components/ui/Input.jsx
function Input({ label, error, className = "", ...props }) {
  return (
    <div className="flex flex-col">
      {label && <label className="text-sm text-blue-900">{label}</label>}
      <input
        className={`border rounded-xl px-4 py-2 bg-white text-sm text-black
          ${error ? "border-red-400" : "border-gray-300"} ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default Input;
```

```jsx
// src/components/ui/Select.jsx
function Select({ label, error, className = "", children, ...props }) {
  return (
    <div className="flex flex-col">
      {label && <label className="text-sm text-blue-900">{label}</label>}
      <select
        className={`border rounded-xl px-4 py-2 bg-white text-sm text-black
          ${error ? "border-red-400" : "border-gray-300"} ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default Select;
```

```jsx
// src/components/ui/Button.jsx
function Button({ variant = "primary", className = "", children, ...props }) {
  const variants = {
    primary: "bg-blue-900 text-white hover:bg-blue-800",
    secondary: "bg-gray-100 text-blue-900 hover:bg-gray-200",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
  };

  return (
    <button
      className={`rounded-lg px-4 py-2 text-sm font-semibold disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
```

```jsx
// src/components/ui/Modal.jsx
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl border border-gray-200 p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <p className="font-semibold text-base text-blue-950">{title}</p>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
```

### 8.4 `components/ui/Form.jsx` — one generic form, reused across every entity and every role's pages

**Design decision (revised from the first draft of this doc):** the original version of this section had a hand-written `PatientForm.jsx` hardcoded to patient fields. That works fine if a form is only ever built once, but it means writing a near-identical form component (same `useState`/`handleChange`/`handleSubmit` skeleton) for every new entity — patients, doctors, appointments. Since the requirement is **one form reusable across admin pages and doctor pages alike**, the form itself belongs in `components/ui/` as a shared primitive (same tier as `Button`/`Input`) and is driven by a **field config** instead of hardcoded fields. Each entity just describes *which fields it needs*; the component itself never changes.

```jsx
// src/components/ui/Form.jsx
import { useState } from "react";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";

function Form({ fields, initialValues = {}, onSubmit, onCancel, isSaving, submitLabel }) {
  const [values, setValues] = useState(() => {
    const base = { id: initialValues.id ?? null };
    fields.forEach((field) => {
      base[field.name] =
        initialValues[field.name] ??
        (field.type === "select" ? field.options?.[0]?.value ?? "" : "");
    });
    return base;
  });

  function handleChange(name) {
    return (e) => setValues((prev) => ({ ...prev, [name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {fields.map((field) =>
        field.type === "select" ? (
          <Select
            key={field.name}
            label={field.label}
            value={values[field.name]}
            onChange={handleChange(field.name)}
            required={field.required}
          >
            {field.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        ) : (
          <Input
            key={field.name}
            label={field.label}
            type={field.type || "text"}
            value={values[field.name]}
            onChange={handleChange(field.name)}
            required={field.required}
          />
        ),
      )}

      <div className="flex justify-end gap-2 mt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : submitLabel ?? (values.id ? "Save changes" : "Create")}
        </Button>
      </div>
    </form>
  );
}

export default Form;
```

**Trade-off, stated plainly:** this is one layer more abstract than a form you can read top to bottom in a single file — you now check the field config *and* `Form.jsx` to see the full picture. In exchange, adding a new entity's create/edit screen on any admin or doctor page becomes "write a field list," not "write a new form component." Worth it once a form needs to appear on more than one page/role, which is this app's actual requirement.

### 8.5 `features/patients/fields.js` — the patient entity's field config

```js
// src/features/patients/fields.js
export const patientFields = [
  { name: "fullName", label: "Full name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone" },
];
```

The same `<Form />` reused for a Doctor entity later would just be a different config living at `features/doctors/fields.js`:

```js
export const doctorFields = [
  { name: "fullName", label: "Full name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  {
    name: "specialty",
    label: "Specialty",
    type: "select",
    required: true,
    options: [
      { value: "cardiology", label: "Cardiology" },
      { value: "family-medicine", label: "Family Medicine" },
    ],
  },
];
```

— dropped into a doctor-management page as `<Form fields={doctorFields} .../>`, no new form component needed.

### 8.6 `features/patients/components/PatientTable.jsx` — Read/Delete

```jsx
// src/features/patients/components/PatientTable.jsx
import Button from "../../../components/ui/Button";

function PatientTable({ patients, onEdit, onDelete }) {
  if (patients.length === 0) {
    return <p className="text-sm text-gray-500 py-6 text-center">No patients yet.</p>;
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="grid grid-cols-4 py-2 px-4 border-b border-gray-200">
        <p className="text-xs text-blue-900 font-semibold">NAME</p>
        <p className="text-xs text-blue-900 font-semibold">EMAIL</p>
        <p className="text-xs text-blue-900 font-semibold">PHONE</p>
        <p className="text-xs text-blue-900 font-semibold">ACTIONS</p>
      </div>

      {patients.map((patient) => (
        <div
          key={patient.id}
          className="grid grid-cols-4 py-3 px-4 border-b border-gray-100 items-center"
        >
          <p className="text-sm">{patient.fullName}</p>
          <p className="text-sm text-gray-500">{patient.email}</p>
          <p className="text-sm text-gray-500">{patient.phone || "—"}</p>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => onEdit(patient)}>
              Edit
            </Button>
            <Button variant="danger" onClick={() => onDelete(patient)}>
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PatientTable;
```

### 8.7 `pages/admin/Patients.jsx` — the page, composing everything

The page itself stays thin: it owns *UI* state (is the modal open, which patient is being edited) and wires the feature's hooks + the shared `Form`/`Modal` to the patient field config. No axios import here at all.

```jsx
// src/pages/admin/Patients.jsx
import { useState } from "react";
import { usePatients, usePatientMutations } from "../../features/patients/hooks";
import { patientFields } from "../../features/patients/fields";
import PatientTable from "../../features/patients/components/PatientTable";
import Form from "../../components/ui/Form";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";

function Patients() {
  const { patients, isLoading, error, refetch } = usePatients();
  const { save, remove, isSaving } = usePatientMutations({ onSuccess: refetch });

  const [editingPatient, setEditingPatient] = useState(null); // null closed, {} = new, {...} = edit
  const isModalOpen = editingPatient !== null;

  async function handleSubmit(values) {
    await save(values);
    setEditingPatient(null);
  }

  async function handleDelete(patient) {
    if (confirm(`Delete ${patient.fullName}?`)) {
      await remove(patient.id);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="font-semibold text-xl text-blue-950">Patients</p>
        <Button onClick={() => setEditingPatient({})}>+ Add patient</Button>
      </div>

      {isLoading && <p className="text-sm text-gray-500">Loading patients...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {!isLoading && !error && (
        <PatientTable
          patients={patients}
          onEdit={setEditingPatient}
          onDelete={handleDelete}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setEditingPatient(null)}
        title={editingPatient?.id ? "Edit patient" : "Add patient"}
      >
        <Form
          fields={patientFields}
          initialValues={editingPatient || undefined}
          onSubmit={handleSubmit}
          onCancel={() => setEditingPatient(null)}
          isSaving={isSaving}
          submitLabel={editingPatient?.id ? "Save changes" : "Add patient"}
        />
      </Modal>
    </div>
  );
}

export default Patients;
```

### 8.8 Wiring the route

```jsx
// in App.jsx (or app/routes.jsx once you've migrated routing)
import Patients from "./pages/admin/Patients";
// ...
<Route path="/admin/patients" element={<Patients />} />
```

### What this buys you

- Want to add "Doctors" next? Copy `features/patients/{api.js,hooks.js,fields.js}` → `features/doctors/`, rename the fields/endpoints, done — and it can reuse the exact same `components/ui/Form.jsx` and `Modal.jsx` you already built, on the admin page *and* a doctor-facing page, with zero new form code. The pattern is now a template, not something you design from scratch each time.
- If the backend changes (say, patients move from REST to a different endpoint shape), you edit **one file** — `features/patients/api.js` — and every component keeps working unchanged.
- Testing `api.js` or `hooks.js` doesn't require rendering any JSX.

---

## 9. Reading list

- [React docs — Thinking in React](https://react.dev/learn/thinking-in-react) — the mental model this whole doc is built on.
- [React docs — You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) — useful once `hooks.js` files start growing `useEffect`s.
- [bulletproof-react](https://github.com/alan2207/bulletproof-react) — a full example repo using the exact `features/{api,hooks,components}` pattern in section 8. Read its `docs/project-structure.md` and skim `src/features/`.
- [Feature-Sliced Design](https://feature-sliced.design) — the more formal version of "feature-based". Read this once the simple version in this doc starts feeling limiting.
- [react-router.com — Nested Routes](https://reactrouter.com/start/framework/routing) — for the `Layout` + `<Outlet />` pattern in section 5.
- [TanStack Query docs](https://tanstack.com/query/latest/docs/framework/react/overview) — the optional upgrade mentioned in section 4, for when `hooks.js` files feel repetitive.
- Kent C. Dodds — [Colocation](https://kentcdodds.com/blog/colocation) — a short read on why "group by feature" beats "group by file type."

---

## 10. Quick checklist for your next feature

- [ ] `features/<name>/api.js` — plain functions wrapping axios, no React.
- [ ] `features/<name>/hooks.js` — owns loading/error/data state.
- [ ] `features/<name>/fields.js` — field config for `components/ui/Form.jsx`, if this entity has a create/edit form.
- [ ] `features/<name>/components/` — dumb components (tables, cards) that call the hooks. Forms don't need a component here — use the shared `Form` + this entity's `fields.js`.
- [ ] `pages/<role>/<Name>.jsx` — thin, just composes the feature.
- [ ] Reuse `components/ui/*` (`Button`, `Input`, `Select`, `Modal`, `Form`) instead of retyping Tailwind classes or writing a new form component.
- [ ] Route added in one place, wrapped by the shared layout + `ProtectedRoute`.
