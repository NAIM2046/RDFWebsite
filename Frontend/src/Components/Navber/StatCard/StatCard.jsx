"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from "framer-motion";


const StatCard = () => {
    const statsData = [
        {
            stat: "9.43L+",
            title: "Beneficiaries",
            description: "More than 95% are empowered women.",
            image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013"
        },
        {
            stat: "5.69MW",
            title: "Green Electricity",
            description: "Saving equivalent power from the national grid.",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
        },
        {
            stat: "1,49,515",
            title: "Solar Homes",
            description: "Bringing light to off-grid rural communities.",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <h2

                className="text-4xl font-bold text-slate-800 mb-4 text-center"
            >
                OUR IMPACT
            </h2>
            <p className="text-emerald-600 font-medium mb-12 text-center">
                Our efforts have transformed communities across Bangladesh.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {statsData.map((item, index) => (
                    <StatCard key={index} {...item} />

                ))}
                <div className="relative w-full max-w-[400px] mx-auto mb-16 rounded-xl shadow-lg">
                    {/* ১. বড় ইমেজ কন্টেইনার */}
                    <div className="relative h-[300px] w-[200px] overflow-hidden rounded-xl shadow-md">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover"
                            unoptimized
                        />
                        {/* ইমেজের উপর হালকা ডার্ক ওভারলে (যদি টেক্সট সাদা হতো তবে লাগত, এখানে কার্ডের জন্য অপশনাল) */}
                        <div className="absolute inset-0 bg-black/10" />
                    </div>

                    {/* ২. ছোট টেক্সট কার্ড (ইমেজের উপর ভাসমান) */}
                    <div
                        className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[330%] bg-white p-6 rounded-xl shadow-xl border border-gray-100 z-10"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-bold text-[#D2147D] mb-1 leading-none">
                                {stat}
                            </h2>

                            <h3 className="text-lg font-bold text-gray-800 mb-2">
                                {title}
                            </h3>

                            <p className="text-sm text-gray-600 leading-snug">
                                {description}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default StatCard;