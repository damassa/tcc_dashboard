// src/context/ModalContext.tsx
import React, { createContext, useContext, useState } from "react";
import type { SerieResponse } from "../types/serie";

type ModalType = "serie" | "category" | null;

type ModalContextType = {
  openModal: (type: ModalType, data?: SerieResponse | null) => void;
  closeModal: () => void;
  modalType: ModalType;
  editingSerie: SerieResponse | null;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [editingSerie, setEditingSerie] = useState<SerieResponse | null>(null);

  const openModal = (type: ModalType, data?: SerieResponse | null) => {
    setModalType(type);
    if (type === "serie" && data) {
      setEditingSerie(data);
    } else {
      setEditingSerie(null);
    }
  };

  const closeModal = () => {
    setModalType(null);
    setEditingSerie(null);
  };

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, modalType, editingSerie }}
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
