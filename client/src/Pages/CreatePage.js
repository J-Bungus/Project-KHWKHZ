import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './CreatePage.css';


const CreatePage = () => {
  const location = useLocation();
  const instance = axios.create({ baseURL: 'https://dreamschools-182388d60dc9.herokuapp.com'});
  const isEdit = location.state != null
  const [ schoolName, setSchoolName ] = useState(location.state ? location.state.name : "");
  const [ about, setAbout ] = useState(location.state ? location.state.about : "");
  const [ image, setImage ] = useState(null);
  const [ preview, setPreview ] = useState(null);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const schoolData = new FormData();
    schoolData.append('name', schoolName);
    schoolData.append('about', about);
    schoolData.append('image', image);

    try {
      const endpoint = isEdit ? '/updateSchool' : '/addSchool';
      if (isEdit) {
        schoolData.append('id', location.state.id);
        schoolData.append('blobURL', location.state.blobURL);
        schoolData.append('blobName', location.state.blobName);
      }

      const res = await instance.post(endpoint, schoolData, {
        headers: {
        'Content-Type': 'multipart/form-data'
      }});
      nav('/');
    } catch (err) {
      console.error("Error submitting: " + err);
    }
  }

  return (
    <div className="create-page">
      <h1 className="title">Create A School Listing</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="create-form">
        <div className="section">
          <div> Name </div>
          <input required
            type="text"
            placeholder="School Name"
            value={schoolName}
            className="name-field"
            onChange={(e) => setSchoolName(e.target.value)}
          />
        </div>
        <div className="section">
          About
          <textarea required
            placeholder="About"
            value={about}
            className="input-field"
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>
        <div className="image-section">
          Image
          <input
            type="file"
            name="image"
            className="input-file"
            onChange={(e) => {
                setImage(e.target.files[0])
                setPreview(URL.createObjectURL(e.target.files[0]));
              }
            }
          />
          <div className="preview">
            <img className="image" src={preview ? preview : (location.state ? location.state.blobURL : null)} alt="preview"/>
            {preview ? "(preview)" : "(current)"}
          </div>
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default CreatePage;