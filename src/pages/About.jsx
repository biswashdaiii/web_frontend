import React from "react";
import { assets } from "../assets/assets";


const AboutUs = () => {
  return (
    <div className="px-6 sm:px-20 py-12 text-gray-800 bg-white">
      {/* About Us Section */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-10">ABOUT <span className="text-primary">US</span></h2>

        <div className="flex flex-col md:flex-row items-center gap-10">
          <img
            src={assets.about_image}
            alt="About us"
            className="w-full md:w-1/2 rounded-lg shadow-lg object-cover"
          />

          <div className="flex-1 space-y-6">
            <p>
              Welcome to <strong>Gharko Doctor</strong>, your trusted partner in managing your healthcare needs conveniently and efficiently.
              At Gharko Doctor, we understand the challenges individuals face when it comes to scheduling doctor appointments
              and managing their health records.
            </p>
            <p>
              Gharko Doctor is committed to excellence in healthcare technology. We continuously strive to enhance our platform,
              integrating the latest advancements to improve user experience and deliver superior service. Whether you're
              booking your first appointment or managing ongoing care, Gharko Doctor is here to support you every step of the way.
            </p>

            <div>
              <h3 className="font-semibold text-lg mb-1">Our Vision</h3>
              <p>
                Our vision at Gharko Doctor is to create a seamless healthcare experience for every user. We aim to bridge the
                gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="max-w-6xl mx-auto mt-20">
        <h2 className="text-2xl font-semibold mb-8 text-center">WHY <span className="text-primary">CHOOSE US</span></h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="border rounded-lg p-6 shadow-sm">
            <h4 className="font-semibold text-lg mb-2">EFFICIENCY</h4>
            <p className="text-gray-600 text-sm">Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
          <div className="border rounded-lg p-6 shadow-sm">
            <h4 className="font-semibold text-lg mb-2">CONVENIENCE</h4>
            <p className="text-gray-600 text-sm">Access to a network of trusted healthcare professionals in your area.</p>
          </div>
          <div className="border rounded-lg p-6 shadow-sm">
            <h4 className="font-semibold text-lg mb-2">PERSONALIZATION</h4>
            <p className="text-gray-600 text-sm">Tailored recommendations and reminders to help you stay on top of your health.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
