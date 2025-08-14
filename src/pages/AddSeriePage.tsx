import React from "react";
import Navbar from "../components/Navbar";

const AddSeriePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center p-7">
        <main className="text-2xl font-bold mb-4 text-white text-center">
          Adicionar uma nova série
        </main>

        <section className="w-full max-w-4xl bg-gray-900 p-6 rounded-2xl shadow-lg">
          <form className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
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
                  placeholder="Nome da série"
                  required
                />
              </div>

              {/* Ano */}
              <div>
                <label
                  htmlFor="year"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Ano
                </label>
                <input
                  type="number"
                  id="year"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  placeholder="Ano"
                  required
                />
              </div>

              {/* Imagem Card */}
              <div>
                <label
                  htmlFor="imageCard"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Imagem do card
                </label>
                <input
                  type="text"
                  id="imageCard"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  placeholder="URL da imagem"
                  required
                />
              </div>

              {/* Imagem Banner */}
              <div>
                <label
                  htmlFor="imageBanner"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Imagem do banner
                </label>
                <input
                  type="text"
                  id="imageBanner"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  placeholder="URL da imagem"
                  required
                />
              </div>

              {/* Vídeo de abertura */}
              <div>
                <label
                  htmlFor="openingVideo"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Vídeo de abertura
                </label>
                <input
                  type="text"
                  id="openingVideo"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  placeholder="URL do vídeo"
                  required
                />
              </div>

              {/* Categoria */}
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Categoria
                </label>
                <select
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  required
                >
                  <option value="">Selecione a categoria</option>
                  <option value="acao">Ação</option>
                  <option value="aventura">Aventura</option>
                </select>
              </div>

              {/* Sinopse */}
              <div className="md:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Sinopse
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Insira a sinopse da série"
                ></textarea>
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

export default AddSeriePage;
