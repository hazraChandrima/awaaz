"use client"

import React from "react";
import { FaFacebook, FaTwitter, FaWhatsapp, FaEnvelope, FaLink } from "react-icons/fa";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
  signatureCount: number; // New prop to pass signature count
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, shareUrl, signatureCount }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Sharing leads to way more signatures.</h2>
        <p className="text-center mb-6">
          👏 {signatureCount.toLocaleString()} new signatures were added to this petition thanks to people who shared it.
          Join them and help this petition grow!
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center border rounded-lg p-2">
            <FaLink className="mr-2" /> Copy link
          </button>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center border rounded-lg p-2"
          >
            <FaFacebook className="mr-2 text-blue-600" /> Facebook
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center border rounded-lg p-2"
          >
            <FaWhatsapp className="mr-2 text-green-500" /> WhatsApp
          </a>
          <a
            href={`https://twitter.com/share?url=${encodeURIComponent(shareUrl)}&text=Sign this petition`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center border rounded-lg p-2"
          >
            <FaTwitter className="mr-2 text-blue-400" /> Twitter
          </a>
          <a
            href={`mailto:?subject=Sign this petition&body=I wanted to share this petition with you: ${encodeURIComponent(shareUrl)}`}
            className="flex items-center border rounded-lg p-2 justify-center"
          >
            <FaEnvelope className="mr-2 text-gray-600" /> Email
          </a>
        </div>
        <button
          className="w-full mt-4 py-2 bg-[#CA3C25]  hover:bg-[#CA3C25]  text-white rounded-lg"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
