import './App.css';
import SubmitFileInput from './SubmitFileInput';
import { useState } from "react";

function App() {
  const [file, setFile] = useState();

  const handleFormSubmission = (e) => {
    e.preventDefault();

    const formData = new FormData();
    
    formData.append('File', file);

    fetch('http://localhost:4200/api/image-upload', {
      method: 'POST',
      body: formData
    }).then((res) => res.json()).then(() => {
      console.log("Success");
    }).catch((err) => {
      console.error("Error: ", err);
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Posting</h1>
      </header>
      <form>
        <SubmitFileInput id={1} setFile={setFile} allowedExtensions={['image/jpeg']}/>
        <button onClick={handleFormSubmission} className="submit-button" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
