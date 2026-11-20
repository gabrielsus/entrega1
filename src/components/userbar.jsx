import { useState } from 'react';
import { AccountIcon } from './svg/account.jsx';
import AlertaSimple from '../alertas/alertasimple.jsx';
import { useAuth } from './auth/authcontext.jsx';
import FiltroBusqueda from './search/searchbar.jsx';
import './userbar.css';

const UserBar = ({radio}) => {
    const { cambiarPassword, user, logout } = useAuth();
    const [menuAbierto, setMenuAbierto] = useState(false);

    const [passwordActual, setPasswordActual] = useState('');
    const [nuevaPassword, setNuevaPassword] = useState('');

    const [alertaAbierta, setAlertaAbierta] = useState(false);
    const [mensajeAlerta, setMensajeAlerta] = useState('');

    const handleGuardarPassword = async () => {
        if (!passwordActual || !nuevaPassword) {
            setMensajeAlerta('Completá ambos campos de contraseña');
            setAlertaAbierta(true);
            return;
        }

        try {
            await cambiarPassword(passwordActual, nuevaPassword);

            setMenuAbierto(false);
            setMensajeAlerta('Contraseña actualizada con éxito');
            setAlertaAbierta(true);
            setPasswordActual('');
            setNuevaPassword('');
        } catch (error) {
            setMensajeAlerta(error.message || 'Error al actualizar la contraseña');
            setAlertaAbierta(true);
        }
    };

    const handleCerrarSesion = async () => {
        try {
            await logout();
            setMenuAbierto(false);
            setMensajeAlerta('Sesión cerrada correctamente');
            setAlertaAbierta(true);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            setMensajeAlerta('Error al cerrar sesión');
            setAlertaAbierta(true);
        }
    };

    return (
        <div className="user-bar-wrapper">
            <div className="user-bar-left">
                <FiltroBusqueda showCategories={radio} />
            </div>

            <div className="user-bar-container">
                <div
                    className="user-bar-profile"
                    onClick={() => setMenuAbierto(!menuAbierto)}
                    title="Opciones de cuenta"
                >
                    <AccountIcon width="22px" height="22px" fill="#374151" />
                    <span className="user-bar-name">{user?.email || 'Gabriel'}</span>
                    <span className={`user-bar-arrow ${menuAbierto ? 'open' : ''}`}>▼</span>
                </div>

                {menuAbierto && (
                    <div className="user-dropdown">
                        <div className="dropdown-user-info">
                            <p className="dropdown-email">{user?.email || 'gabriel.sus@gmail.com'}</p>
                            <span className="dropdown-badge">Administrador</span>
                        </div>

                        <div className="dropdown-separator"></div>

                        <div className="dropdown-section">
                            <h4>Cambiar Contraseña</h4>
                            <input
                                type="password"
                                placeholder="Contraseña actual"
                                className="dropdown-input"
                                value={passwordActual}
                                onChange={(e) => setPasswordActual(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Nueva contraseña"
                                className="dropdown-input"
                                value={nuevaPassword}
                                onChange={(e) => setNuevaPassword(e.target.value)}
                            />
                            <button
                                className="dropdown-btn-primary"
                                onClick={handleGuardarPassword}
                            >
                                Guardar cambios
                            </button>
                        </div>

                        <div className="dropdown-separator"></div>

                        <button
                            className="dropdown-btn-danger"
                            onClick={handleCerrarSesion}
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                )}
            </div>

            {alertaAbierta && (
                <AlertaSimple
                    mensaje={mensajeAlerta}
                    onCerrar={() => setAlertaAbierta(false)}
                />
            )}
        </div>
    );
};

export default UserBar;