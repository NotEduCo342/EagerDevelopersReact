import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const EmailVerified: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          ایمیل شما با موفقیت تایید شد!
        </h1>
        <p className="text-gray-600 mb-6">
          اکنون می‌توانید وارد حساب کاربری خود شوید.
        </p>
        <Link
          to="/login"
          className="w-full inline-block bg-sky-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-sky-600 transition-colors duration-300"
        >
          رفتن به صفحه ورود
        </Link>
      </div>
    </div>
  );
};

export default EmailVerified;
