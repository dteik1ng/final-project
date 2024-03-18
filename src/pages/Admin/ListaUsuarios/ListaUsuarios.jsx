import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import "./ListaUsuarios.css";
import { /* FaEye, */ FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Users from "../../../services/UsuariosService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import MenuLateral from "../../../components/Admin/MenuLateral/MenuLateral";
/* 
import { Document, Page, Text, View, StyleSheet } from "react-pdf"; */ //exportar a pdf

import * as XLSX from "xlsx"; 
import { saveAs } from "file-saver";

function ListaUsuarios() {
  const [searchQuery, setSearchQuery] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({
    id: null,
    nombre: "",
    apellido: "",
    direccion: "",
    celular: "",
    correo: "",
    createdAt: "",
    RolId: null,
  });

  /*   const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUser, setNewUser] = useState({
    nombre: "",
    apellido: "",
    direccion: "",
    celular: "",
    correo: "",
    password: "",
    createdAt: "",
    RolId: null,
  }); */

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const usersData = await Users.getUsers(token);
        setUsuarios(usersData);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    loadUsers();
  }, []);

  /*  const handleAggUser = async (user) => {
    try {
      const newUser = await Users.addUser(user);
      if (newUser && newUser.error) {
        // Si hay un error en la respuesta, lanzar una excepción
        throw new Error(newUser.error);
      }
  
      console.log("Usuario agregado:", newUser);
      const updatedUsers = await Users.getUsers();
      updatedUsers.sort((a, b) => a.id - b.id);
      setUsuarios(updatedUsers);
      toast.success("Usuario agregado correctamente");
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      toast.error(error.message || "Error al agregar el usuario");
    }
  }; */

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDeleteUser = async (id) => {
    try {
      await Users.deleteUser(id);
      const updatedUsers = usuarios.filter((user) => user.id !== id);
      setUsuarios(updatedUsers);
      toast.success("Usuario eliminado correctamente");
    } catch (error) {
      console.error(`Error al eliminar usuario con ID ${id}:`, error);
      toast.error("Error al eliminar el usuario");
    }
  };

  const handleEditUser = (user) => {
    setEditMode(true);
    setEditedUser(user);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedUser({
      id: null,
      nombre: "",
      apellido: "",
      direccion: "",
      celular: "",
      correo: "",
      createdAt: "",
      RolId: null,
    });
  };

  const handleSaveEdit = async () => {
    try {
      await Users.updateUser(editedUser.id, editedUser);
      setEditMode(false);
      const updatedUsers = await Users.getUsers();
      updatedUsers.sort((a, b) => a.id - b.id);
      setUsuarios(updatedUsers);
      toast.success("Cambios guardados correctamente");
    } catch (error) {
      console.error(`Error al guardar la edición del usuario:`, error);
      toast.error("Error al guardar los cambios");
    }
  };

  /*   const handleToggleAddUserForm = () => {
    setShowAddUserForm(!showAddUserForm);
    setNewUser({
      nombre: "",
      apellido: "",
      direccion: "",
      celular: "",
      correo: "",
      createdAt: "",
      RolId: null,
    });
  }; */

  /*   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  }; */

  /*   const handleSaveNewUser = async () => {
    try {
      // Llama a la función para agregar usuario con el estado actual de newUser
      const response = await handleAggUser(newUser);
  
      // Verifica si la respuesta contiene un error
      if (response && response.error) {
        throw new Error(response.error);
      }
  
      setShowAddUserForm(false);
      toast.success("Usuario agregado correctamente");
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      toast.error(error.message || "Error al agregar el usuario");
    }
  }; */

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = usuarios
    .filter((usuario) =>
      Object.values(usuario).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(usuarios.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const getRolName = (RolId) => {
    if (RolId === 1) {
      return "Admin";
    } else if (RolId === 2) {
      return "User";
    }
    return "";
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd/MM/yyyy");
  };

  //la constante para excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(usuarios);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, "usuarios.xlsx");
  };
  

  return (
    <>
      <MenuLateral />
      <ToastContainer />
      <div className="UsuariosContainer">
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar Usuarios"
            className="search-input"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button onClick={handleSearchInputChange}>
            <CiSearch className="search-icon" />
          </button>
        </div>

        <div className="buttons-agg-user">
          <button
            className="Agregar-usuario" /* onClick={handleToggleAddUserForm} */
          >
            <Link to="/agregarUser">
              <FaPlus />
            </Link>
          </button>
        </div>

        {/*  {showAddUserForm && (
          <div className="add-user-form">
            <h3>Agregar Usuario</h3>
            <form>
              <label className="campos-form-user">Nombre:</label>
              <input
                className="inputs-form-user"
                type="text"
                id="nombre"
                name="nombre"
                value={newUser.nombre || ""}
                onChange={handleInputChange}
              />

              <label className="campos-form-user">Apellido:</label>
              <input
                className="inputs-form-user"
                type="text"
                id="apellido"
                name="apellido"
                value={newUser.apellido || ""}
                onChange={handleInputChange}
              />

              <label className="campos-form-user">Dirección:</label>
              <input
                className="inputs-form-user"
                type="text"
                id="direccion"
                name="direccion"
                value={newUser.direccion || ""}
                onChange={handleInputChange}
              />

              <label className="campos-form-user">Celular:</label>
              <input
                className="inputs-form-user"
                type="text"
                id="celular"
                name="celular"
                value={newUser.celular || ""}
                onChange={handleInputChange}
              />

              <label className="campos-form-user">Contraseña:</label>
              <input
                className="inputs-form-user"
                type="password"
                id="password"
                name="password"
                value={newUser.password || ""}
                onChange={handleInputChange}
              />

              <label className="campos-form-user">Correo:</label>
              <input
                className="inputs-form-user"
                type="text"
                id="correo"
                name="correo"
                value={newUser.correo || ""}
                onChange={handleInputChange}
              />
              <div className="container-button-form-user">
                <button
                  type="button"
                  className="button-agg-user-guardar"
                  onClick={handleSaveNewUser}
                >
                  Guardar
                </button>
                <button
                  type="button"
                  className="button-agg-user-cancelar"
                  onClick={handleToggleAddUserForm}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )} */}

        <table className="table-usuarios">
          <thead>
            <tr>
              <th scope="col" className="header-table-users">
                ID
              </th>
              <th scope="col" className="header-table-users">
                Nombre
              </th>
              <th scope="col" className="header-table-users">
                Apellido
              </th>
              <th scope="col" className="header-table-users">
                Direccion
              </th>
              <th scope="col" className="header-table-users">
                Celular
              </th>
              <th scope="col" className="header-table-users">
                Correo
              </th>
              <th scope="col" className="header-table-users">
                Fecha de creación
              </th>
              <th scope="col" className="header-table-users">
                Rol
              </th>
              <th scope="col">
                {" "}
                <button onClick={exportToExcel}>Exportar a Excel</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellido}</td>
                <td>{usuario.direccion}</td>
                <td>{usuario.celular}</td>
                <td>{usuario.correo}</td>
                <td>{formatDate(usuario.createdAt)}</td>
                <td>{getRolName(usuario.RolId)}</td>
                <td>
                  <div className="buttons-users">
                    {/*                     <button className="button-usuario-especifico">
                      <Link to={`/usuarioespecifico/${usuario.id}`}>
                        <FaEye />
                      </Link>
                    </button> */}
                    {!editMode && (
                      <>
                        <button
                          className="Editar-usuario"
                          onClick={() => handleEditUser(usuario)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="Eliminar-usuario"
                          onClick={() => handleDeleteUser(usuario.id)}
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
          <div className="edit-user-form">
            <h3>Editar Usuario</h3>
            <form>
              <label htmlFor="nombre" className="campos-form-edit-user">
                Nombre:
              </label>
              <input
                className="inputs-form-edit-user"
                type="text"
                id="nombre"
                name="nombre"
                value={editedUser.nombre}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, nombre: e.target.value })
                }
              />

              <label htmlFor="apellido" className="campos-form-edit-user">
                Apellido:
              </label>
              <input
                className="inputs-form-edit-user"
                type="text"
                id="apellido"
                name="apellido"
                value={editedUser.apellido}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, apellido: e.target.value })
                }
              />

              <label htmlFor="direccion" className="campos-form-edit-user">
                Dirección:
              </label>
              <input
                className="inputs-form-edit-user"
                type="text"
                id="direccion"
                name="direccion"
                value={editedUser.direccion}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, direccion: e.target.value })
                }
              />

              <label htmlFor="celular" className="campos-form-edit-user">
                Celular:
              </label>
              <input
                className="inputs-form-edit-user"
                type="text"
                id="celular"
                name="celular"
                value={editedUser.celular}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, celular: e.target.value })
                }
              />

              <label htmlFor="correo" className="campos-form-edit-user">
                Correo:
              </label>
              <input
                className="inputs-form-edit-user"
                type="text"
                id="correo"
                name="correo"
                value={editedUser.correo}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, correo: e.target.value })
                }
              />
              <div className="container-button-form-edit-user">
                <button
                  type="button"
                  className="button-guardar-edit"
                  onClick={handleSaveEdit}
                >
                  Guardar
                </button>
                <button
                  type="button"
                  className="button-cancelar-edit"
                  onClick={handleCancelEdit}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="pagination-container">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={currentPage === number ? "active" : ""}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default ListaUsuarios;
