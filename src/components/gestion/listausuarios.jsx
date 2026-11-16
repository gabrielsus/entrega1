import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { getProfiles, deleteProfile, updateProfile } from "@/API/firebase/firebaseservice.js";
import { auth } from '@/API/firebase/firebase.js'; // Importás tu auth para obtener el usuario actual
import './ListaUsuarios.css';

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados para controlar el modal de edición
  const [modalAbierto, setModalAbierto] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [nombreEditado, setNombreEditado] = useState('');

  // UID del usuario logueado actualmente en Firebase Auth
  const usuarioActualUid = auth.currentUser?.uid;

  const cargarUsuarios = async () => {
    setLoading(true);
    try {
      const data = await getProfiles();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleEditar = (row) => {
    setUsuarioSeleccionado(row);
    setNombreEditado(row.nombre || '');
    setModalAbierto(true);
  };

  const handleGuardarCambios = async (e) => {
    e.preventDefault();
    if (!usuarioSeleccionado) return;

    try {
      await updateProfile(usuarioSeleccionado.id, { nombre: nombreEditado });
      setModalAbierto(false);
      cargarUsuarios();
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este perfil?")) {
      try {
        await deleteProfile(id);
        cargarUsuarios();
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  const columnas = [
    {
      name: 'Nombre',
      selector: row => row.nombre || 'Sin nombre',
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Rol',
      selector: row => row.rol,
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: row => {
        // Evaluamos si el row actual es el usuario logueado usando su id interno
        const esUsuarioActual = row.id === usuarioActualUid;

        return (
          <div className="acciones-container">
            <button 
              className="btn-accion"
              onClick={() => handleEditar(row)}
              title="Editar usuario"
            >
              ✏️
            </button>
            
            {esUsuarioActual ? (
              <span title="No podés eliminar tu propio usuario" className="btn-bloqueado">
                🔒
              </span>
            ) : (
              <button 
                className="btn-accion"
                onClick={() => handleEliminar(row.id)}
                title="Eliminar usuario"
              >
                🗑️
              </button>
            )}
          </div>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="usuarios-container">
      <h2>Gestión de Usuarios</h2>
      
      <button 
        className="btn-nuevo"
        onClick={() => console.log("Abrir modal de alta")}
      >
        + Nuevo Usuario
      </button>

      <DataTable
        columns={columnas}
        data={usuarios}
        progressPending={loading}
        pagination
        highlightOnHover
        pointerOnHover
        noDataComponent="No hay usuarios registrados"
      />

      {/* Modal de edición */}
      {modalAbierto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Editar Usuario</h3>
            <p><strong>Email:</strong> {usuarioSeleccionado?.email}</p>
            
            <form onSubmit={handleGuardarCambios}>
              <div className="form-group">
                <label>Nombre:</label>
                <input 
                  type="text" 
                  value={nombreEditado} 
                  onChange={(e) => setNombreEditado(e.target.value)} 
                />
              </div>

              <div className="modal-buttons">
                <button type="submit" className="btn-guardar">Guardar</button>
                <button type="button" className="btn-cancelar" onClick={() => setModalAbierto(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaUsuarios;