import './alertasimple.css';

const AlertaSimple = ({ mensaje, tipo = 'info', onCerrar }) => {
  const esError = tipo === 'error';

  return (
    <div className="alerta-backdrop">
      <div className={`alerta-box ${esError ? 'alerta-error' : ''}`}>
        <p className={`alerta-mensaje ${esError ? 'alerta-mensaje-error' : ''}`}>
          {mensaje}
        </p>
        <button type="button" className="alerta-btn" onClick={onCerrar}>
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default AlertaSimple;