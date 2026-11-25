const Spinner =({texto = "Cargando..."})=>{
  return (
    <div className="spinner-wrapper" role="status" aria-live="polite" aria-busy="true">
      <div className="spinner-circulo" />
      <span>{texto}</span>
    </div>
  );
};

export default Spinner;