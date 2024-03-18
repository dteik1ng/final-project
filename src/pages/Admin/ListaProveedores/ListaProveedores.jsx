import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import "./ListaProveedores.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Proveedores from "../../../services/ProveedoresService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuLateral from "../../../components/Admin/MenuLateral/MenuLateral";

function ListaProveedores() {
  const [searchQuery, setSearchQuery] = useState("");
  const [proveedores, setProveedores] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [editMode, setEditMode] = useState(false);
  const [editedProveedor, setEditedProveedor] = useState({
    id: null,
    nombre: "",
    direccion: "",
    celular: "",
  });

  const [showAddProveedorForm, setShowAddProveedorForm] = useState(false);
  const [newProveedor, setNewProveedor] = useState({
    id: null,
    nombre: "",
    direccion: "",
    celular: "",
  });

  useEffect(() => {
    const loadProveedores = async () => {
      try {
        const proveedoresData = await Proveedores.getProveedores();
        if (Array.isArray(proveedoresData)) {
          const sortedProveedores = [...proveedoresData].sort((a, b) => a.id - b.id);
          setProveedores(sortedProveedores);
        } else {
          console.error("Los datos de proveedores no son un arreglo:", proveedoresData);
        }
      } catch (error) {
        console.error("Error al obtener proveedores:", error);
      }
    };
  
    loadProveedores();
  }, []);

  const handleAggProveedor = async (proveedor) => {
    try {
      const newProveedor = await Proveedores.addProveedor(proveedor);
      console.log("Proveedor agregado:", newProveedor);
      const updatedProveedores = await Proveedores.getProveedores();
      if (Array.isArray(updatedProveedores)) {
        const sortedProveedores = [...updatedProveedores].sort((a, b) => a.id - b.id);
        setProveedores(sortedProveedores);
      } else {
        console.error("Los datos de proveedores no son un arreglo:", updatedProveedores);
      }
      toast.success("Proveedor agregado correctamente");
    } catch (error) {
      console.error("Error al agregar proveedor:", error);
      toast.error("Error al agregar el proveedor");
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDeleteProveedor = async (id) => {
    try {
      await Proveedores.deleteProveedor(id);
      const updatedProveedores = proveedores.filter((prov) => prov.id !== id);
      setProveedores(updatedProveedores);
      toast.success("Proveedor eliminado correctamente");
    } catch (error) {
      console.error(`Error al eliminar proveedor con ID ${id}:`, error);
      toast.error("Error al eliminar el proveedor");
    }
  };

  const handleEditProveedor = (prov) => {
    setEditMode(true);
    setEditedProveedor(prov);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedProveedor({
      id: null,
      nombre: "",
      direccion: "",
      celular: "",
    });
  };

  const handleSaveEdit = async () => {
    try {
      await Proveedores.updateProveedor(editedProveedor.id, editedProveedor);
      setEditMode(false);
      const updatedProveedores = await Proveedores.getProveedores();
      updatedProveedores.sort((a, b) => a.id - b.id);
      setProveedores(updatedProveedores);
      toast.success("Cambios guardados correctamente");
    } catch (error) {
      console.error(`Error al guardar la edición del proveedor:`, error);
      toast.error("Error al guardar los cambios");
    }
  };

  const handleToggleAddProveedorForm = () => {
    setShowAddProveedorForm(!showAddProveedorForm);
    setNewProveedor({
      id: "",
      nombre: "",
      direccion: "",
      celular: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProveedor({ ...newProveedor, [name]: value });
  };

  const handleSaveNewProveedor = async () => {
    try {
      await handleAggProveedor(newProveedor);
      setShowAddProveedorForm(false);
      toast.success("Proveedor agregado correctamente");
    } catch (error) {
      console.error("Error al agregar proveedor:", error);
      toast.error("Error al agregar el proveedor");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProveedores = proveedores
    .filter((prov) =>
      Object.values(prov).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(proveedores.length / itemsPerPage); i++) {
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
            placeholder="Buscar Proveedores"
            className="search-input"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button onClick={handleSearchInputChange}>
            <CiSearch className="search-icon" />
          </button>
        </div>

        <div className="buttons-agg">
          <button
            className="Agregar-proveedor"
            onClick={handleToggleAddProveedorForm}
          >
            <FaPlus />
          </button>
        </div>

        {showAddProveedorForm && (
          <div className="add-proveedor-form">
            <h3>Agregar Proveedor</h3>
            <form>
              <label className="campos-form-proveedor">Nombre:</label>
              <input
                className="inputs-form-proveedor"
                type="text"
                id="nombre"
                name="nombre"
                value={newProveedor.nombre}
                onChange={handleInputChange}
              />

              <label className="campos-form-proveedor">Dirección:</label>
              <input
                className="inputs-form-proveedor"
                type="text"
                id="direccion"
                name="direccion"
                value={newProveedor.direccion}
                onChange={handleInputChange}
              />

              <label className="campos-form-proveedor">Celular:</label>
              <input
                className="inputs-form-proveedor"
                type="text"
                id="celular"
                name="celular"
                value={newProveedor.celular}
                onChange={handleInputChange}
              />

              <button
                type="button"
                className="Guardar-edit"
                onClick={handleSaveNewProveedor}
              >
                Guardar
              </button>
            </form>
          </div>
        )}

        <table className="table-proveedores">
          <thead>
            <tr>
              <th scope="col" className="header-table-proveedores">
                ID
              </th>
              <th scope="col" className="header-table-proveedores">
                Nombre
              </th>
              <th scope="col" className="header-table-proveedores">
                Dirección
              </th>
              <th scope="col" className="header-table-proveedores">
                Celular
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {currentProveedores.map((prov) => (
              <tr key={prov.id}>
                <td>{prov.id}</td>
                <td>{prov.nombre}</td>
                <td>{prov.direccion}</td>
                <td>{prov.celular}</td>
                <td>
                  <div className="buttons-proveedores">
                    {!editMode && (
                      <>
                        <button
                          className="Editar-proveedor"
                          onClick={() => handleEditProveedor(prov)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="Eliminar-proveedor"
                          onClick={() => handleDeleteProveedor(prov.id)}
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
            <h3>Editar Proveedor</h3>
            <form>
              <label className="campos-form-proveedor">Nombre:</label>
              <input
                className="inputs-form-proveedor"
                type="text"
                id="nombre"
                name="nombre"
                value={editedProveedor.nombre}
                onChange={(e) =>
                  setEditedProveedor({ ...editedProveedor, nombre: e.target.value })
                }
              />

              <label className="campos-form-proveedor">Dirección:</label>
              <input
                className="inputs-form-proveedor"
                type="text"
                id="direccion"
                name="direccion"
                value={editedProveedor.direccion}
                onChange={(e) =>
                  setEditedProveedor({ ...editedProveedor, direccion: e.target.value })
                }
              />

              <label className="campos-form-proveedor">Teléfono:</label>
              <input
                className="inputs-form-proveedor"
                type="text"
                id="telefono"
                name="telefono"
                value={editedProveedor.telefono}
                onChange={(e) =>
                  setEditedProveedor({ ...editedProveedor, telefono: e.target.value })
                }
              />

              <label className="campos-form-proveedor">Celular:</label>
              <input
                className="inputs-form-proveedor"
                type="text"
                id="celular"
                name="celular"
                value={editedProveedor.celular}
                onChange={(e) =>
                  setEditedProveedor({ ...editedProveedor, celular: e.target.value })
                }
              />

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

export default ListaProveedores;
