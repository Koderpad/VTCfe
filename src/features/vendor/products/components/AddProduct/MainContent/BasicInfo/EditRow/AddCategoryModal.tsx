import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

type Props = {
  isOpen: boolean;
  onRequestClose: () => void;
  addCategory: (newCategory: string) => void;
};

const CategoryModal = ({ isOpen, onRequestClose, addCategory }: Props) => {
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    addCategory(newCategory);
    setNewCategory("");
    onRequestClose();
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      width: "50%",
      margin: "auto",
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <h2>Chọn Category</h2>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <button onClick={handleAddCategory}>Thêm Category</button>
    </Modal>
  );
};

export default CategoryModal;
