import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { getProfiles, deleteProfile, updateProfile, createUserProfile } from "@/API/firebase/firebaseservice.js";
import { auth } from '@/API/firebase/firebase.js';
import './ListaUsuarios.css';

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('');

  // Estados del modal (si usuarioSeleccionado es null, es Alta; si tiene objeto, es Edición)
  const [modalAbierto, setModalAbierto] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  
  // Campos del formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Requerido para crear en Firebase Auth
  const [rol, setRol] = useState('cliente');

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

  // Abrir modal en modo ALTA
  const handleNuevo = () => {
    setUsuarioSeleccionado(null);
    setNombre('');
    setEmail('');
    setPassword('');
    setRol('cliente');
    setModalAbierto(true);
  };

  // Abrir modal en modo EDICIÓN
  const handleEditar = (row) => {
    setUsuarioSeleccionado(row);
    setNombre(row.nombre || '');
    setEmail(row.email || '');
    setPassword(''); // No se edita la contraseña acá
    setRol(row.rol || 'cliente');
    setModalAbierto(true);
  };

  const handleGuardar = async (e) => {
    e.preventDefault();

    try {
      if (usuarioSeleccionado) {
        // Modo Edición (actualizamos nombre y rol)
        await updateProfile(usuarioSeleccionado.id, { nombre, rol });
      } else {
        // Modo Alta usando el método correcto de tu service
        await createUserProfile(email, password, nombre, rol);
      }
      setModalAbierto(false);
      cargarUsuarios();
    } catch (error) {
      console.error("Error al guardar:", error);
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

  // Filtrado en tiempo real por nombre o email
  const usuariosFiltrados = usuarios.filter(u =>
    (u.nombre && u.nombre.toLowerCase().includes(filtro.toLowerCase())) ||
    (u.email && u.email.toLowerCase().includes(filtro.toLowerCase()))
  );

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
      
      {/* Buscador en su propio bloque arriba */}
      <div className="contenedor-buscador">
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          className="input-buscador"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>

      {/* Botón de nuevo usuario en su propio bloque separado */}
      <div className="contenedor-btn-nuevo">
        <button className="btn-nuevo" onClick={handleNuevo}>
          + Nuevo Usuario
        </button>
      </div>

      <DataTable
        columns={columnas}
        data={usuariosFiltrados}
        progressPending={loading}
        pagination
        highlightOnHover
        pointerOnHover
        noDataComponent="No se encontraron usuarios"
      />

      {/* Modal unificado para Alta y Edición */}
      {modalAbierto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{usuarioSeleccionado ? 'Editar Usuario' : 'Nuevo Usuario'}</h3>
            
            <form onSubmit={handleGuardar}>
              <div className="form-group">
                <label>Email:</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!!usuarioSeleccionado}
                  required
                />
              </div>

              {!usuarioSeleccionado && (
                <div className="form-group">
                  <label>Contraseña:</label>
                  <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label>Nombre:</label>
                <input 
                  type="text" 
                  value={nombre} 
                  onChange={(e) => setNombre(e.target.value)} 
                  required
                />
              </div>

              <div className="form-group">
                <label>Rol:</label>
                <select value={rol} onChange={(e) => setRol(e.target.value)}>
                  <option value="cliente">Cliente</option>
                  <option value="administrador">Administrador</option>
                </select>
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