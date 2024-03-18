import "./ListaVentas.css";
import MenuLateral from "../../../components/Admin/MenuLateral/MenuLateral";
import { ToastContainer } from 'react-toastify';
import { CiSearch } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { useState } from 'react';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ListaVentas() {
  const [editMode] = useState(false);
  const [itemsPerPage] = useState(8);
  const [ventas] = useState([]);


  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(ventas.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
    const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(ventas);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ventas");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(data, "ventas.xlsx");
  };


  return (
    <>
      <MenuLateral />
      <ToastContainer />
      <div className="VentasContainer">
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar Ventas"
            className="search-input"
            value=""
            onChange=""
          />
          <button onClick="">
            <CiSearch className="search-icon" />
          </button>
        </div>

        <table className="table-ventas">
          <thead>
            <tr>
              <th scope="col" className="header-table-venta">
                ID
              </th>
              <th scope="col" className="header-table-venta">
                Nombre
              </th>
              <th scope="col" className="header-table-venta">
                Apellido
              </th>
              <th scope="col" className="header-table-venta">
                Direccion
              </th>
              <th scope="col" className="header-table-venta">
                Celular
              </th>
              <th scope="col" className="header-table-venta">
                Correo
              </th>
              <th scope="col" className="header-table-venta">
                Fecha de creación
              </th>
              <th scope="col" className="header-table-venta">
                Rol
              </th>
              <th scope="col">
                 <button className="export" onClick={exportToExcel}>
                  Exportar a Excel{" "}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            
              <tr >
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <div className="buttons-ventas">
                    <button className="button-venta-especifico">
                      <Link >
                        <FaEye />
                      </Link>
                    </button>
                    {!editMode && (
                      <>
                        <button
                          className="Editar-venta"
                          onClick=""
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="Eliminar-venta"
                          onClick=""
                        >
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            
          </tbody>
        </table>

        {editMode && (
          <div className="edit-venta-form">
            <h3>Editar Usuario</h3>
            <form>
              <label htmlFor="nombre" className="campos-form-edit-venta">
                Nombre:
              </label>
              <input
                className="inputs-form-edit-venta"
                type="text"
                id="nombre"
                name="nombre"
                value=""
                onChange=""
              />

              <label htmlFor="apellido" className="campos-form-edit-venta">
                Apellido:
              </label>
              <input
                className="inputs-form-edit-venta"
                type="text"
                id="apellido"
                name="apellido"
                value=""
                onChange=""
              />

              <label htmlFor="direccion" className="campos-form-edit-venta">
                Dirección:
              </label>
              <input
                className="inputs-form-edit-venta"
                type="text"
                id="direccion"
                name="direccion"
                value=""
                onChange=""
              />

              <label htmlFor="celular" className="campos-form-edit-venta">
                Celular:
              </label>
              <input
                className="inputs-form-edit-venta"
                type="text"
                id="celular"
                name="celular"
                value=""
                onChange=""
              />

              <label htmlFor="correo" className="campos-form-edit-venta">
                Correo:
              </label>
              <input
                className="inputs-form-edit-venta"
                type="text"
                id="correo"
                name="correo"
                value=""
                onChange=""
              />
              <div className="container-button-form-edit-venta">
                <button
                  type="button"
                  className="button-guardar-edit"
                  onClick=""
                >
                  Guardar
                </button>
                <button
                  type="button"
                  className="button-cancelar-edit"
                  onClick=""
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
              onClick=""
              className=""
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default ListaVentas;
