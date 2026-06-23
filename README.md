# 💼 Project Application Form Component

A dynamic, fully validated, and responsive **Project Application Form** built using **React** and modern frontend ecosystem tools. This component handles complex form states, dynamic arrays for project additions, conditional field rendering, and strict schema validation to ensure a seamless user onboarding experience.

---

## 📸 Live Preview

### 1. Main Application Form
![Project Application Form](./src/assets/Screenshot%202026-06-23%20211138.png)

---

## ✨ Features

* **Complete Applicant Profile:** Collects multi-field inputs including Full Name, Email, Role Applied For, and Experience Levels.
* **Dynamic Fields Array (`useFieldArray`):** Users can dynamically add, update, or remove multiple past projects seamlessly.
* **Conditional UI Rendering:** The Notice Period dropdown displays smoothly only if the applicant selects *"No, I have notice period"* under Availability.
* **Advanced Form Management:** Powered by `react-hook-form` for optimal rendering performance without unnecessary re-renders.
* **Robust Schema Validation:** Fully integrated with `Zod` and `@hookform/resolvers/zod` to handle client-side validations and custom error messages.
* **Polished Dark UI:** Tailored with a custom dark-themed interface utilizing specialized `shadcn/ui` custom primitives and primitives from `lucide-react` icons.

---

## 🛠️ Built With

* **Framework:** [React.js](https://react.dev/) + [Vite](https://vitejs.dev/)
* **Form Logic:** `react-hook-form`
* **Validation:** `Zod`
* **UI Components:** `shadcn/ui` (Popover, Calendar, Select, Radio Group, Checkbox, Textarea, Input)
* **Styling:** `Tailwind CSS` & `clsx` / `tailwind-merge` (`cn` utility)
* **Icons:** `lucide-react`
* **Date Management:** `date-fns`

---

## 🚀 Getting Started

### Prerequisites

Make sure you have your shadcn base component fields setup in your `@/components/ui/` folder:
* `field` (Field, FieldGroup, FieldLabel, FieldError)
* `input`, `textarea`, `button`, `label`
* `select`, `radio-group`, `checkbox`
* `calendar`, `popover`

### Installation

1. **Install the required dependencies:**
   ```bash
   npm install react-hook-form @hookform/resolvers zod lucide-react date-fns