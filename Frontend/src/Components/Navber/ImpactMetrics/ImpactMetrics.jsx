import React, { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "framer-motion";
import soler from "/public/assets/impact/3.jpg";
import soler1 from "/public/assets/impact/Grameen-Shakti-png.png";
import owmain from "/public/assets/impact/IMG-0962-JPG.jpg";

// কাউন্টার অ্যানিমেশনের জন্য একটি আলাদা ছোট কম্পোনেন্ট
const AnimatedCounter = ({ value, suffix }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);

  // ডেসিমেল (দশমিক) চেক করার জন্য: যদি ডট থাকে তবে ২ দশমিক পর্যন্ত দেখাবে, না থাকলে পূর্ণসংখ্যা
  const isDecimal = value.toString().includes(".");
  const rounded = useTransform(motionValue, (latest) =>
    isDecimal ? latest.toFixed(2) : Math.floor(latest),
  );

  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, parseFloat(value), {
        duration: 2, // অ্যানিমেশন কত সেকেন্ড চলবে
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, value, motionValue]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

// ১. এটি একটি একক কার্ডের সাব-কম্পোনেন্ট যা ম্যাপ করার সময় ডাটা রিসিভ করবে
const SingleStatCard = ({ statNumber, suffix, title, description, image }) => {
  return (
    <div className="relative w-full max-w-[400px] mx-auto mb-24 rounded-xl">
      {" "}
      {/* mb-16 থেকে বাড়িয়ে mb-24 করা হয়েছে যাতে নিচের কার্ডটি কেটে না যায় */}
      {/* বড় ইমেজ কন্টেইনার */}
      <div className="relative h-[300px] w-full overflow-hidden rounded-xl shadow-md">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* ইমেজের উপর হালকা ডার্ক ওভারলে */}
        <div className="absolute inset-0 bg-black/10" />
      </div>
      {/* ছোট টেক্সট কার্ড (ইমেজের উপর ভাসমান) */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[90%] bg-white p-6 rounded-xl shadow-xl border border-gray-100 z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-[#3cc043] mb-1 leading-none">
            {/* এখানে কাউন্টার কম্পোনেন্টটি কল করা হয়েছে */}
            <AnimatedCounter value={statNumber} suffix={suffix} />
          </h2>

          <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>

          <p className="text-sm text-gray-600 leading-snug">{description}</p>
        </motion.div>
      </div>
    </div>
  );
};

// ২. মূল মেইন কম্পোনেন্ট
const StatCard = () => {
  // ডাটা স্ট্রাকচারে সামান্য পরিবর্তন করা হয়েছে (নাম্বার এবং টেক্সট আলাদা করার জন্য)
  const statsData = [
    {
      statNumber: 9.43,
      suffix: "L+",
      title: "Beneficiaries",
      description: "More than 95% are empowered women.",
      image:
        "https://i.ibb.co.com/mKYpxpF/Whats-App-Image-2026-06-13-at-12-03-08-PM.jpg",
    },
    {
      statNumber: 48.58,
      suffix: "MW",
      title: "Green Electricity",
      description: "Saving equivalent power from the national grid.",
      image: soler,
    },
    {
      statNumber: 25000,
      suffix: "+",
      title: "Child Rights & Education",
      description:
        "RDF ensuring basic education and protection for underprivileged children.",
      image:
        "https://i.ibb.co.com/n8zBZjYm/1124-3-Practical-Session-of-Karate-Training-2-JPG.jpg",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-slate-800 mb-4 pb-4 text-center">
        Impact of Our Activities
      </h2>

      {/* গ্রিড লেআউট */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {statsData.map((item, index) => (
          <SingleStatCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default StatCard;
