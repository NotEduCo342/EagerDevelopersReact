import {
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaTelegramPlane,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-t-3xl pt-20 pb-6 font-Yekan">
        <div className="w-full flex flex-wrap max-[735px]:flex-col max-[735px]:items-center justify-evenly items-start gap-10">
          <div className="flex flex-col gap-5 h-full justify-center">
            <h3 className="text-3xl font-bold text-center">شبکه های اجتماعی</h3>
            <div className="flex justify-evenly  items-center gap-4">
              <Link
                to="#"
                className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 transition-transform duration-300 transform hover:-translate-y-1 hover:scale-110 shadow-md"
                aria-label="Twitter"
              >
                <FaTwitter size={18} />
              </Link>
              <Link
                to="#"
                className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 transition-transform duration-300 transform hover:-translate-y-1 hover:scale-110 shadow-md"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </Link>
              <Link
                to="#"
                className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 transition-transform duration-300 transform hover:-translate-y-1 hover:scale-110 shadow-md"
                aria-label="Github"
              >
                <FaGithub size={18} />
              </Link>
              <Link
                to="#"
                className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 transition-transform duration-300 transform hover:-translate-y-1 hover:scale-110 shadow-md"
                aria-label="Github"
              >
                <FaTelegramPlane size={18} />
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-5 h-full justify-center items-center">
            <h3 className="text-3xl font-bold text-center">لینک های سریع</h3>
            <Link className="item-footer">پروژه ها</Link>
            <Link className="item-footer">درباره ما</Link>
            <Link className="item-footer">ارتباط با ما</Link>
            <Link className="item-footer">ورود یا ثبت نام</Link>
          </div>
          <div className="flex flex-col gap-5 h-full  items-center">
            <h3 className="text-3xl font-bold text-center">راه های ارتباطی</h3>
            <div className=" text-[1.2rem] font-bold inline-block">تماس: 1234567-028</div>
            <div className=" text-[1.2rem] font-bold inline-block"> info@fastfood.com :ایمیل</div>
            <div className=" text-[1.2rem] font-bold inline-block text-center">
              آدرس: قزوین , چهارراه ولیعصر , جهاد دانشگاهی
            </div>
          </div>
          <div className="flex flex-col gap-5 h-full  items-center  w-auto text-center">
            <h3 className="text-3xl font-bold text-center max-[425px]:whitespace-nowrap">Eager Developers</h3>
            <span>
              ترکیبی از خلاقیت و فناوری برای ساخت تجربه‌های دیجیتال ماندگار
            </span>
          </div>
        </div>

        <div className="mt-10 border-t border-white/20 pt-3 text-center text-gray-200 text-sm font-Yekan">
          © {new Date().getFullYear()} EAGER DEVELOPERS - همه حقوق محفوظ است
        </div>
      </footer>
    </>
  );
};

export default Footer;
