import { useEffect, useState } from "react";
import useFetch from "../../hooks/UseFetch";
import { CHECK_MAIL_URL, GOOGLE_OAUTH_URL } from "../../Urls";
import { useNavigate } from "react-router-dom";

const CheckMailForm = () => {
  const [email, setEmail] = useState({ email: "" });
  const { data, error, loading, request } = useFetch();

  const navigate = useNavigate();

  const onChange = (e) => {
    setEmail({ email: e.target.value });
  };

  useEffect(() => {
  if (data?.success) {
    localStorage.setItem("email", email.email)
    if(data.status === "EXISTS") {
      navigate("/login");
    } else {
      navigate("/verify-otp");
    }
  }
}, [data, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: email.email, // since backend expects plain text (string only)
    };

    request(CHECK_MAIL_URL, options);

    if(data?.success) {
      navigate("/verify-otp");
    }
    

  };

  const onSuccess = async (token) => {
    try {
      const response = token;
      console.log(response);
    } catch (e) {
      const error = e;
      console.log(error);
    }
  }

    // Add Google OAuth handler
  const handleGoogleLogin = () => {
    // Redirect to Spring Boot OAuth2 endpoint
    window.location.assign(GOOGLE_OAUTH_URL);

  };
  return (
    <section className="bg-wih-800/60 backdrop-blur rounded-2xl border border-wih-700/40 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)] p-8 md:p-10">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
        Welcome Back
      </h2>

      <div className="mt-8 space-y-6">
        <button 
          type="button" // Important: prevent form submission
          onClick={handleGoogleLogin}
          className="w-full inline-flex items-center justify-center gap-3 rounded-full bg-white text-black font-medium py-3 px-4 hover:opacity-95 active:scale-[0.99] transition"
        >
          <span className="-ml-1">
            <GoogleIcon />
          </span>
          <span>Sign in with Google</span>
        </button>


        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-wih-700" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-wih-800/60 px-3 text-xs text-wih-50/70">
              or
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-3">
            <label className="block text-sm text-wih-50/80">
              Organization email
            </label>

            {/* ✅ Validation message block */}
            {loading && (
              <p className="text-sm text-blue-400 mb-1">Sending OTP...</p>
            )}
            {data?.success && (
              <p className="text-sm text-green-400 mb-1">
                {data.message || "Success"}
              </p>
            )}
            {error && (
              <p className="text-sm text-red-400 mb-1">
                {error || "Something went wrong!"}
              </p>
            )}

            <input
              type="email"
              onChange={onChange}
              value={email.email}
              placeholder="Enter your organization’s email"
              className="w-full rounded-lg bg-wih-900/60 border border-wih-700 px-4 py-3 text-wih-50 placeholder:text-wih-50/40 focus:outline-none focus:ring-2 focus:ring-wih-600/60"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-wih-700 hover:bg-wih-600 text-wih-50 font-medium py-3 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Please wait..." : "Continue"}
            </button>
          </div>
        </form>
      </div>

      <p className="mt-6 text-xs text-wih-50/50">
        By continuing, you agree to our Terms and Privacy Policy.
      </p>
    </section>
  );
};

export default CheckMailForm;

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" width="18" height="18" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C33.393,6.053,28.915,4,24,4C12.955,4,4,12.955,4,24 s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      />
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,16.108,18.961,14,24,14c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C33.393,6.053,28.915,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24,44c4.777,0,9.116-1.824,12.441-4.807l-5.755-4.869C28.645,35.915,26.423,36.8,24,36.8 c-5.202,0-9.619-3.321-11.281-7.96l-6.55,5.047C9.487,39.556,16.227,44,24,44z"
      />
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.793,2.239-2.237,4.166-4.062,5.603 c0.001-0.001,0.002-0.001,0.003-0.002l5.755,4.869C35.813,39.668,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      />
    </svg>
  );
}
