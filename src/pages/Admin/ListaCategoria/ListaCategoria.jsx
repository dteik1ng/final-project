import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import "./ListaCategoria.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Categorias from "../../../services/CategoriaService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuLateral from "../../../components/Admin/MenuLateral/MenuLateral";

function ListaCategoria() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [editMode, setEditMode] = useState(false);
  const [editedCategoria, setEditedCategoria] = useState({
    id: null,
    nombre: "",
  });

  useEffect(() => {
    const loadCategorias = async () => {
      try {
        const categoriasData = await Categorias.getCategorias();
        if (Array.isArray(categoriasData)) {
          const sortedCategorias = [...categoriasData].sort(
            (a, b) => a.id - b.id
          );
          setCategorias(sortedCategorias);
        } else {
          console.error(
            "Los datos de las categorías no son un arreglo:",
            categoriasData
          );
        }
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    loadCategorias();
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDeleteCategoria = async (id) => {
    try {
      await Categorias.deleteCategoria(id);
      const updatedCategorias = categorias.filter((cat) => cat.id !== id);
      setCategorias(updatedCategorias);
      toast.success("Categoría eliminada correctamente");
    } catch (error) {
      console.error(`Error al eliminar categoría con ID ${id}:`, error);
      toast.error("Error al eliminar la categoría");
    }
  };

  const handleEditCategoria = (cat) => {
    setEditMode(true);
    setEditedCategoria(cat);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedCategoria({
      id: null,
      nombre: "",
    });
  };

  const handleSaveEdit = async () => {
    try {
      await Categorias.updateCategoria(editedCategoria.id, editedCategoria);
      setEditMode(false);
      const updatedCategorias = await Categorias.getCategorias();
      updatedCategorias.sort((a, b) => a.id - b.id);
      setCategorias(updatedCategorias);
      toast.success("Cambios guardados correctamente");
    } catch (error) {
      console.error(`Error al guardar la edición de la categoría:`, error);
      toast.error("Error al guardar los cambios");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategorias = categorias
    .filter((cat) =>
      Object.values(cat).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(categorias.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <MenuLateral />
      <ToastContainer />
      <div className="ProveedoresContainer">
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar Categoría"
            className="search-input"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button onClick={handleSearchInputChange}>
            <CiSearch className="search-icon" />
          </button>
        </div>

        <div className="buttons-agg-categorias">
          <button className="Agregar-categorias">
            <Link to="/agregarcategoria">
              <FaPlus />
            </Link>
          </button>
        </div>

        <table className="table-proveedores">
          <thead>
            <tr>
              <th scope="col" className="header-table-proveedores">
                ID
              </th>
              <th scope="col" className="header-table-proveedores">
                Nombre
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {currentCategorias.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.nombre}</td>
                <td>
                  <div className="buttons-proveedores">

                    {!editMode && (
                      <>
                        <button
                          className="Editar-proveedor"
                          onClick={() => handleEditCategoria(cat)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="Eliminar-proveedor"
                          onClick={() => handleDeleteCategoria(cat.id)}
                        >
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editMode && (
          <div className="edit-proveedor-form">
            <h3>Editar Categoría</h3>
            <form>
              <label className="campos-form-proveedor">Nombre:</label>
              <input
                className="inputs-form-proveedor"
                type="text"
                id="nombre"
                name="nombre"
                value={editedCategoria.nombre}
                onChange={(e) =>
                  setEditedCategoria({
                    ...editedCategoria,
                    nombre: e.target.value,
                  })
                }
              />

              {/* Añade aquí más campos para editar la categoría si es necesario */}

              <button
                type="button"
                className="Guardar-edit"
                onClick={handleSaveEdit}
              >
                Guardar
              </button>
              <button
                type="button"
                className="Cancelar-edit"
                onClick={handleCancelEdit}
              >
                Cancelar
              </button>
            </form>
          </div>
        )}

        <div className="pagination-container">
          {pageNumbers.map((number) => (
            <span
              key={number}
              className={`pagination-number ${
                number === currentPage ? "active" : ""
              }`}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default ListaCategoria;
