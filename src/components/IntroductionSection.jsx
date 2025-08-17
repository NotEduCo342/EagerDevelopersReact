const IntroductionSection = () => {
  return (
    <section
      id="introduction-section"
      className="py-10 px-5 text-[20px] text-black"
    >
      <section className="flex flex-wrap justify-evenly items-center h-[32rem] mb-10">
        <div className="pic-left">
          <img
            src="./img/background/Second-Subject.webp"
            alt=""
            className="w-120 h-[300px] rounded-2xl shadow-[-20px_-20px_0px_#2f89fc] object-cover"
          />
        </div>

        <div className="text-right ml-5 flex flex-col ">
          <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-tr from-[#2f89fc] to-[#00fff0] flex items-center justify-center text-white mb-5">
            <i className="zmdi zmdi-lamp text-2xl"></i>
          </div>
          <h3 className="bg-gradient-to-tr from-[#2f89fc] to-[#00fff0] bg-clip-text text-transparent font-[PELAK] text-center mb-5">
            <span className="text-[#2f89fc]">توسعه وب نوین</span> <br />
            طراحی کاربرمحور تجربه‌ای متمایز در دنیای دیجیتال
          </h3>
          <p className=" text-[#666] w-[600px] leading-8 font-[PELAK] mb-5 ">
            توسعه وب نوین فرآیندی است که با بهره‌گیری از ابزارها و فناوری‌های
            پیشرفته، امکان ایجاد وبسایت‌های پویا و تعاملی را برای توسعه‌دهندگان
            فراهم می‌کند این مهارت در دنیای مدرن امروز نقشی کلیدی در پیشرفت
            دیجیتال دارد و با ارائه تجربه‌ای بهتر به کاربران، شرکت‌ها و
            سازمان‌ها را قادر می‌سازد تا مخاطبان خود را تحت تأثیر قرار دهند این
            فناوری بستری برای خلق نوآوری‌های جدید و توسعه مستمر در حوزه تکنولوژی
            است
          </p>
        </div>
      </section>

      <section className="flex flex-wrap justify-center items-center flex-row-reverse">
        <div className="pic-left">
          <img
            src="./img/background/Third-Subject.webp"
            alt=""
            className="w-120 h-[300px] rounded-2xl shadow-[20px_-20px_0px_orangered] object-cover"
          />
        </div>

        <div className="text-right mr-5 flex flex-col">
          <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-r from-[orangered] to-[orange] flex items-center justify-center text-white mb-5">
            <i className="zmdi zmdi-folder text-2xl"></i>
          </div>
          <h3 className="bg-gradient-to-r from-[orangered] to-[orange] bg-clip-text text-transparent font-[PELAK] text-center mb-5">
            طراحی وب مبتنی بر تجربه <br />
            آینده وب با فناوری‌های مدرن و پیشرفته ساخته می‌شود
          </h3>
          <p className=" text-[#666] w-[600px] leading-8 font-[PELAK] mb-5">
            طراحی وب مبتنی بر تجربه کاربری زمینه‌ای است که هدف آن ایجاد رابط‌های
            کاربری ساده و کاربردی است در این فرآیند از عناصر گرافیکی جذاب و اصول
            برنامه‌نویسی استفاده می‌شود تا صفحات وب بهبود یافته و تعامل کاربران
            با سایت بهینه شود این روش باعث افزایش رضایت کاربر و ارتقای کیفیت
            خدمات ارائه شده در بستر دیجیتال می‌شود طراحی موفق به توسعه‌دهندگان
            این امکان را می‌دهد که برند خود را به شکلی متمایز به نمایش بگذارند
          </p>
        </div>
      </section>
    </section>
  );
};

export default IntroductionSection;
