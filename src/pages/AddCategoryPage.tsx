import React from "react";
import Navbar from "../components/Navbar";

const AddCategoryPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center p-7">
        <main className="text-2xl font-bold mb-4 text-white text-center">
          Adicionar uma nova categoria
        </main>

        <section className="w-full max-w-2xl bg-gray-900 p-6 rounded-2xl shadow-lg">
          <form className="space-y-6">
            <div className="grid gap-6">
              {/* Nome */}
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  placeholder="Nome da categoria"
                  required
                />
              </div>
            </div>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                type="submit"
                className="bg-purple-900 hover:bg-purple-800 transition-colors text-white rounded-lg px-6 py-2"
              >
                Salvar
              </button>
              <button
                type="button"
                className="bg-purple-200 hover:bg-purple-300 transition-colors text-black rounded-lg px-6 py-2"
              >
                Cancelar
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default AddCategoryPage;
