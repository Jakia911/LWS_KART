"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";

interface ModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ isModalOpen, closeModal }) => {
  const { data: session } = useSession();

  const [email, setEmail] = useState(session?.user?.email || "");
  const [name, setName] = useState(session?.user?.name || "");
  const [message, setMessage] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, closeModal]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Profile updated successfully!");
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage("An error occurred while updating the profile.");
    }

    closeModal();
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded shadow-lg max-w-md w-full"
      >
        <form onSubmit={handleUpdate}>
          <div>
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded text-[#000]"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded text-[#000]"
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white w-full py-2 rounded-md mt-6"
          >
            Update Profile
          </button>
        </form>
        {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default Modal;
