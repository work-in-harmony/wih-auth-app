import { useState, useRef, useEffect } from 'react';
import useFetch from '../../hooks/UseFetch';
import { VERIFY_OTP_URL } from '../../Urls';
import { useNavigate } from 'react-router-dom';

const EmailVerification = ({ email = 'mohdelham107@gmail.com' }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const { data, error, loading, request } = useFetch();

  const navigate = useNavigate();


  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();


  }, []);

  useEffect(() => {
    if (data?.success) {
      console.log('Verification successful:', data);
      // Handle successful verification (e.g., redirect to dashboard)
      navigate('/signup');
      
    }
  }, [data,navigate]);

  const handleChange = (index, value) => {
    // Only allow single digit
    if (value.length > 1) return;
    
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = [...code];
    pastedData.split('').forEach((char, i) => {
      if (i < 6) newCode[i] = char;
    });
    setCode(newCode);

    // Focus last filled input or last input
    const lastIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleVerify = (e) => {
    e.preventDefault();
    
    const otp = code.join('');
    
    if (otp.length !== 6) {
      return;
    }

    const email = localStorage.getItem('email');

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        otp,
        email,
      }),
    };



    request(VERIFY_OTP_URL, options);
  };

  const handleResend = () => {
    // Implement resend logic here
    // You can call your CHECK_MAIL_URL again
    console.log('Resending code...');
    setCode(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen bg-wih-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-wih-50">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
            </svg>
            <span className="text-lg font-medium">WORKINHARMONY</span>
          </div>
        </div>

        {/* Main Content */}
        <section className="bg-wih-800/60 backdrop-blur rounded-2xl border border-wih-700/40 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)] p-8 md:p-10">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-wih-50 mb-3">
              We emailed you a code
            </h1>
            
            <p className="text-wih-50/80 text-sm mb-2">
              We sent a six digit code to <span className="font-medium text-wih-50">{email}</span>.
            </p>
            
            <p className="text-wih-50/80 text-sm mb-8">
              Enter the code below:
            </p>

            {/* Validation Messages */}
            <div className="mb-4 min-h-[20px]">
              {loading && (
                <p className="text-sm text-blue-400">Verifying...</p>
              )}
              {data?.success && (
                <p className="text-sm text-green-400">
                  {data.message || 'Verification successful!'}
                </p>
              )}
              {error && (
                <p className="text-sm text-red-400">
                  {error || 'Invalid code. Please try again.'}
                </p>
              )}
            </div>

            {/* OTP Input */}
            <form onSubmit={handleVerify}>
              <div className="flex justify-center gap-2 md:gap-3 mb-6">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className="w-12 h-14 md:w-14 md:h-16 text-center text-xl md:text-2xl font-medium bg-wih-900/60 text-wih-50 border border-wih-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-wih-600/60 transition"
                  />
                ))}
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                disabled={loading || code.join('').length !== 6}
                className="w-full rounded-lg bg-wih-700 hover:bg-wih-600 text-wih-50 font-medium py-3 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Verify'}
              </button>
            </form>

            {/* Resend Link */}
            <div className="mt-6 text-sm text-wih-50/70">
              Didn't receive an email? Try checking your junk folder.{' '}
              <button
                onClick={handleResend}
                disabled={loading}
                className="text-wih-50 underline hover:no-underline disabled:opacity-50 transition"
              >
                Resend code.
              </button>
            </div>
          </div>
        </section>

        <p className="mt-6 text-xs text-wih-50/50 text-center">
          By continuing, you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default EmailVerification;