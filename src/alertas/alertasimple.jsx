import './alertasimple.css'; // Reutilizamos un CSS limpio o el mismo enfoque

const AlertaSimple = ({ mensaje, onCerrar }) => {
    return (
        <div className="modal-backdrop">
            <div className="form-prod-local" style={{ maxWidth: '350px', textAlign: 'center' }}>
                <p style={{ color: '#117efb', fontWeight: '600', fontSize: '1rem', margin: '0 0 1rem 0' }}>
                    {mensaje}
                </p>
                <div className="modal-botones" style={{ justifyContent: 'center' }}>
                    <button type="button" onClick={onCerrar} style={{ backgroundColor: '#4a90e2', color: '#fff' }}>
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlertaSimple;