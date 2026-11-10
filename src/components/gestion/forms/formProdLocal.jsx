import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import noImage from "../../../assets/noimage.jpg"; 
import { subirImagenImgBB } from "@/API/imagebb/upimagebb"; 
import './formProdLocal.css';

const FormProdLocal = ({ initialData, modoEliminar, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        description: initialData?.description || "",
        image: initialData?.image || "",
        price: initialData?.price || "",
        shipping: initialData?.shipping || "",
        weight: initialData?.weight || "",
        category: initialData?.category || "",
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
        accept: { 'image/*': [] },
        maxFiles: 1,
        multiple: false,
        disabled: modoEliminar, // Si estamos borrando, desactivamos el dropzone
        onDrop: (acceptedFiles) => {
            if (acceptedFiles && acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                setSelectedFile(file);
                setPreviewUrl(URL.createObjectURL(file));
            }
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Si está en modo eliminar, no subimos nada, solo ejecutamos el submit (que disparará el delete)
            if (modoEliminar) {
                await onSubmit();
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
                    alert("No se pudo subir la imagen a ImgBB. Verificá tu conexión e intentá de nuevo.");
                    setIsSubmitting(false);
                    return; 
                }
            }

            const payload = {
                ...formData,
                image: finalImageUrl
            };

            await onSubmit(payload);
        } catch (error) {
            console.error("Error al procesar el formulario:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-backdrop">
            <form onSubmit={handleSubmit} className="form-prod-local">
                {/* Título dinámico en rojo si es eliminación */}
                <h3 style={modoEliminar ? { color: '#e57373' } : {}}>
                    {modoEliminar 
                        ? "Confirmación de elemento a eliminar" 
                        : (initialData ? "Editar Producto" : "Nuevo Producto")}
                </h3>
                
                {modoEliminar && (
                    <div style={{ marginBottom: '1rem', color: '#2d3748', fontSize: '0.95rem' }}>
                        ¿Estás seguro de que querés eliminar el producto <b>{formData.description}</b>? Esta acción no se puede deshacer.
                    </div>
                )}

                <div className="form-group" style={modoEliminar ? { opacity: 0.6, pointerEvents: 'none' } : {}}>
                    <label htmlFor="description">Descripción:</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        disabled={modoEliminar}
                        required
                    />
                </div>

                <div className="form-group" style={modoEliminar ? { opacity: 0.6, pointerEvents: 'none' } : {}}>
                    <label htmlFor="category">Categoría:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        disabled={modoEliminar}
                    />
                </div>

                {/* Área de Dropzone y Vista Previa (Se oculta o deshabilita en modo eliminar si preferís, o se deja estática) */}
                <div className="form-group">
                    <label>Imagen del Producto:</label>
                    
                    <div className="dropzone-container" {...(modoEliminar ? {} : getRootProps())} style={modoEliminar ? { cursor: 'default' } : {}}>
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
                                    <img src={noImage} alt="Sin imagen" className="img-placeholder" />
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

                <div className="form-group" style={modoEliminar ? { opacity: 0.6, pointerEvents: 'none' } : {}}>
                    <label htmlFor="price">Precio:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        disabled={modoEliminar}
                        required
                    />
                </div>

                <div className="form-group" style={modoEliminar ? { opacity: 0.6, pointerEvents: 'none' } : {}}>
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

                <div className="form-group" style={modoEliminar ? { opacity: 0.6, pointerEvents: 'none' } : {}}>
                    <label htmlFor="weight">Peso:</label>
                    <input
                        type="text"
                        id="weight"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        disabled={modoEliminar}
                    />
                </div>

                <div className="modal-botones">
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        style={modoEliminar ? { backgroundColor: '#e57373' } : {}}
                    >
                        {isSubmitting 
                            ? "Procesando..." 
                            : (modoEliminar ? "Eliminar Definitivamente" : "Guardar")}
                    </button>
                    <button type="button" onClick={onCancel} disabled={isSubmitting}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormProdLocal;