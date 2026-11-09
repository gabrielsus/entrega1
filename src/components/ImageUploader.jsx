import { useDropzone } from 'react-dropzone';

const FileUploader = () => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    // Acá podés restringir o aceptar cualquier archivo binario salvo texto plano si quisieras
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles[0]); // Acá recibís el archivo binario
    }
  });

  return (
    <div 
      {...getRootProps()} 
      style={{
        border: '2px dashed #cccccc',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer'
      }}
    >
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Soltá el archivo acá...</p> :
          <p>Arrastrá y soltá un archivo aquí, o hacé clic para seleccionarlo</p>
      }
    </div>
  );
};

export default FileUploader;