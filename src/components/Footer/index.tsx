import React from "react";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagram,
  FaGithubSquare,
  FaLinkedin,
} from "react-icons/fa";

import "./styles.css";

const socialLinks = [
  { icon: FaFacebookSquare, alt: "Facebook" },
  { icon: FaTwitterSquare, alt: "Twitter" },
  { icon: FaInstagram, alt: "Instagram" },
  { icon: FaGithubSquare, alt: "GitHub" },
  { icon: FaLinkedin, alt: "LinkedIn" },
];

const Footer: React.FC = () => {
  return (
    <footer className="footer-bg text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Follow Us</h1>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map(({ icon: Icon, alt }) => (
                <Icon
                  key={alt}
                  size={30}
                  className="text-white hover:text-gray-400 transition-colors duration-300"
                  aria-label={alt}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="text-white py-4">
        <div className="container mx-auto px-4 text-right">
          <p>&copy; Zurich Malaysia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
