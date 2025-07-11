import React, { createContext, useContext, useState } from "react";
import type { SerieResponse } from "../types/serie";
import type { CategoryResponse } from "../types/category";

type ModalType = "serie" | "category" | null;

type ModalContextType = {
  openModal: (
    type: ModalType,
    data?: SerieResponse | CategoryResponse | null
  ) => void;
  closeModal: () => void;
  modalType: ModalType;
  editingSerie: SerieResponse | null;
  editingCategory: CategoryResponse | null;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [editingSerie, setEditingSerie] = useState<SerieResponse | null>(null);
  const [editingCategory, setEditingCategory] =
    useState<CategoryResponse | null>(null);

  const openModal = (
    type: ModalType,
    data?: SerieResponse | CategoryResponse | null
  ) => {
    setModalType(type);
    if (type === "serie" && data) {
      setEditingSerie(data as SerieResponse);
      setEditingCategory(null);
    } else if (type === "category" && data) {
      setEditingCategory(data as CategoryResponse);
      setEditingSerie(null);
    } else {
      setEditingSerie(null);
      setEditingCategory(null);
    }
  };

  const closeModal = () => {
    setModalType(null);
    setEditingSerie(null);
    setEditingCategory(null);
  };

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
        modalType,
        editingSerie,
        editingCategory,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal deve ser usado dentro do ModalProvider");
  return ctx;
};
