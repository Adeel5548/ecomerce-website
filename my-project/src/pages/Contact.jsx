import React from "react";
import Layout from "../components/Layout";
import ContactUs from "../assets/image.png";
import { FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <Layout title={'ContactUs'}>
      <section className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-200 to-pink-100">
        <div className="bg-white shadow-xl rounded-3xl p-8 max-w-4xl w-full mx-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
            {/* Left Side */}
            <div>
              <h2 className="text-4xl font-bold text-pink-600 mb-4 text-center md:text-left">
                Contact Us
              </h2>

              <p className="text-gray-600 text-base mb-6 text-center md:text-left">
                We'd love to hear from you! Reach out with your questions,
                feedback, or connect with us on social media.
              </p>
              {/* Phone */}
              <div className="flex items-center space-x-3">
                <FaPhoneAlt />
                <p className="text-gray-700">+92 300 1234567</p>{" "}
                {/* Replace with your real phone number */}
              </div>

              <div className="space-y-4 my-4">
                {/* Instagram */}
                <div className="flex items-center space-x-3">
                  <a
                    href="https://instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://img.icons8.com/fluency/40/instagram-new.png"
                      alt="Instagram"
                      className="hover:scale-110 transition-transform"
                    />
                  </a>
                  <p className="text-gray-700">your_instagram_id</p>{" "}
                  {/* Replace with your real Instagram ID */}
                </div>



                {/* Gmail */}
                <div className="flex items-center space-x-3">
                  <a href="mailto:example@gmail.com">
                    <img
                      src="https://img.icons8.com/fluency/40/gmail-new.png"
                      alt="Gmail"
                      className="hover:scale-110 transition-transform"
                    />
                  </a>
                  <p className="text-gray-700">example@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex justify-center">
              <img
                src={ContactUs}
                alt="Contact"
                className="rounded-xl h-72 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
