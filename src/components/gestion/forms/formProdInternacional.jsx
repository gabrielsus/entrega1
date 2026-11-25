import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import noImage from "../../../assets/noimage.jpg";
import { subirImagenImgBB } from "@/API/imagebb/upimagebb";
import { listaPaises } from "@/data/paises";
import categoriasData from "@/data/categories.json";
import "./formProdLocal.css";
import {
  validarNumeroFormato,
  validarNoVacio,
  validarTextoMinimo,
} from "@/validaciones/validaciones";

const normalizarCategoriaInicial = (valor) => {
  if (!valor) return "General";
  const limpia = String(valor).trim().toLowerCase();
  const match = categoriasData.find((cat) => cat.toLowerCase() === limpia);
  return match || valor;
};

const FormProdInternacional = ({
  initialData,
  modoEliminar,
  onSubmit,
  onCancel,
}) => {
  const [errores, setErrores] = useState({});
  const [formData, setFormData] = useState({
    description: initialData?.description || "",
    image: initialData?.image || "",
    price: initialData?.price || "",
    shipping: initialData?.shipping || "",
    weight: initialData?.weight || "",
    category: normalizarCategoriaInicial(initialData?.category),
    origin: initialData?.origin || "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(initialData?.image || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    disabled: modoEliminar,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
      }
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      if (modoEliminar) {
        await onSubmit();
        return;
      }

      const nuevosErrores = {
        description: validarTextoMinimo(formData.description, 4, "Descripción"),
        price: validarNumeroFormato(formData.price, "Precio"),
        weight: validarNoVacio(formData.weight, "Peso"),
      };

      setErrores(nuevosErrores);

      const hayErrores = Object.values(nuevosErrores).some(Boolean);
      if (hayErrores) {
        setIsSubmitting(false);
        return;
      }

      let finalImageUrl = formData.image;

      if (selectedFile) {
        try {
          const urlCruda = await subirImagenImgBB(selectedFile);

          if (!urlCruda) {
            throw new Error("ImgBB no devolvió una URL válida.");
          }

          finalImageUrl = `${urlCruda}?t=${Date.now()}`;
        } catch (imgError) {
          console.error("Fallo en la subida a ImgBB:", imgError);
          alert(
            "No se pudo subir la imagen a ImgBB. Verificá tu conexión e intentá de nuevo."
          );
          setIsSubmitting(false);
          return;
        }
      }

      const payload = {
        ...formData,
        image: finalImageUrl,
      };

      await onSubmit(payload);
    } catch (error) {
      console.error("Error al procesar el formulario internacional:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <form onSubmit={handleSubmit} className="form-prod-local" noValidate>
        <h3 className={modoEliminar ? "titulo-eliminar" : ""}>
          {modoEliminar
            ? "Confirmación de elemento internacional a eliminar"
            : initialData
            ? "Editar Producto Internacional"
            : "Nuevo Producto Internacional"}
        </h3>

        {modoEliminar && (
          <div className="texto-alerta-eliminar">
            ¿Estás seguro de que querés eliminar el producto internacional{" "}
            <b>{formData.description}</b>? Esta acción no se puede deshacer.
          </div>
        )}

        <div
          className={`form-group ${modoEliminar ? "form-group-disabled" : ""}`}
        >
          <label htmlFor="description">Descripción:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={modoEliminar}
          />
          {errores.description && (
            <span className="error-texto" style={{ color: "red" }}>
              {errores.description}
            </span>
          )}
        </div>

        <div
          className={`form-group ${modoEliminar ? "form-group-disabled" : ""}`}
        >
          <label htmlFor="category">Categoría:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            disabled={modoEliminar}
          >
            <option value="">Seleccioná una categoría...</option>
            {categoriasData.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div
          className={`form-group ${modoEliminar ? "form-group-disabled" : ""}`}
        >
          <label htmlFor="origin">Origen (País):</label>
          <select
            id="origin"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            disabled={modoEliminar}
            required
          >
            <option value="">Seleccioná un país...</option>
            {listaPaises.map((pais, index) => (
              <option key={index} value={pais}>
                {pais}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Imagen del Producto:</label>

          <div
            className={`dropzone-container ${
              modoEliminar ? "dropzone-disabled" : ""
            }`}
            {...(modoEliminar ? {} : getRootProps())}
          >
            {!modoEliminar && <input {...getInputProps()} />}

            <div className="preview-box">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Vista previa"
                  onError={(e) => {
                    e.target.onerror = null;
                    setPreviewUrl("");
                  }}
                />
              ) : (
                <div className="fallback-image">
                  <img
                    src={noImage}
                    alt="Sin imagen"
                    className="img-placeholder"
                  />
                </div>
              )}
            </div>

            {!modoEliminar && (
              <p className="dropzone-text">
                {isDragActive
                  ? "Soltá la imagen acá..."
                  : "Arrastrá una imagen o hacé clic para seleccionar"}
              </p>
            )}
          </div>
        </div>

        <div
          className={`form-group ${modoEliminar ? "form-group-disabled" : ""}`}
        >
          <label htmlFor="price">Precio:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            disabled={modoEliminar}
          />
          {errores.price && (
            <span className="error-texto" style={{ color: "red" }}>
              {errores.price}
            </span>
          )}
        </div>

        <div
          className={`form-group ${modoEliminar ? "form-group-disabled" : ""}`}
        >
          <label htmlFor="shipping">Envío:</label>
          <input
            type="text"
            id="shipping"
            name="shipping"
            value={formData.shipping}
            onChange={handleChange}
            disabled={modoEliminar}
          />
        </div>

        <div
          className={`form-group ${modoEliminar ? "form-group-disabled" : ""}`}
        >
          <label htmlFor="weight">Peso:</label>
          <input
            type="text"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            disabled={modoEliminar}
          />
          {errores.weight && (
            <span className="error-texto" style={{ color: "red" }}>
              {errores.weight}
            </span>
          )}
        </div>

        <div className="modal-botones">
          <button
            type="submit"
            disabled={isSubmitting}
            className={modoEliminar ? "btn-eliminar-submit" : ""}
          >
            {isSubmitting
              ? "Procesando..."
              : modoEliminar
              ? "Eliminar Definitivamente"
              : "Guardar"}
          </button>
          <button type="button" onClick={onCancel} disabled={isSubmitting}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormProdInternacional;