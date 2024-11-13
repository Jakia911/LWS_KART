"use client";
import { useState } from "react";
import Modal from "./Modal";

const UpdateUserModalButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button onClick={openModal} className="text-primary">
        Edit
      </button>
      <Modal isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};

export default UpdateUserModalButton;
