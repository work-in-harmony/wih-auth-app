import CloudinaryImageUploader from "./CloudinaryImageUploader";

const SignUpForm = (props) => {
  return (
    <form
      onSubmit={props.handleSubmit}
      className="flex flex-col md:flex-row gap-10 items-center justify-center"
    >
      {/* Profile Picture */}

      <div className="mb-8">
        <CloudinaryImageUploader
          onImageUpload={props.handleImageUpload}
          currentImageUrl={props.profilePictureUrl}
        />
      </div>

      {/* Inputs and Button */}
      <div className="flex-1 w-full max-w-sm space-y-5">
        <div>
          <label
            htmlFor="username"
            className="block text-sm mb-2 text-[var(--color-wih-50)]"
          >
            What is your full name?
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={props.formData.username}
            onChange={props.handleChange}
            className={`w-full px-4 py-3 bg-[var(--color-wih-900)] border ${
              props.errors.username
                ? "border-red-500"
                : "border-[var(--color-wih-700)]"
            } rounded-lg focus:outline-none focus:border-indigo-500 text-[var(--color-wih-50)]`}
          />
          {props.errors.username && (
            <p className="mt-1 text-sm text-red-500">{props.errors.username}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm mb-2 text-[var(--color-wih-50)]"
          >
            Enter your password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={props.formData.password}
            onChange={props.handleChange}
            className={`w-full px-4 py-3 bg-[var(--color-wih-900)] border ${
              props.errors.password
                ? "border-red-500"
                : "border-[var(--color-wih-700)]"
            } rounded-lg focus:outline-none focus:border-indigo-500 text-[var(--color-wih-50)]`}
          />
          {props.errors.password && (
            <p className="mt-1 text-sm text-red-500">{props.errors.password}</p>
          )}
          {/* Optional: Helper text */}
          {!props.errors.password && (
            <p className="mt-1 text-xs text-[var(--color-wih-600)]">
              Must be at least 8 characters with at least one number
            </p>
          )}
        </div>

        {props.errors.submit && (
          <div className="p-3 bg-red-500/10 border border-red-500 rounded-lg">
            <p className="text-sm text-red-500">{props.errors.submit}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={props.loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 text-white font-medium py-3 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
        >
          {props.loading ? "Creating account..." : "Continue"}
        </button>
      </div>
    </form>
  );
};
export default SignUpForm;
