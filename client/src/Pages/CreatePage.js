import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreatePage.css';


const CreatePage = () => {
  const instance = axios.create({ baseURL: 'https://dreamschools-182388d60dc9.herokuapp.com'});
  const [schoolName, setSchoolName] = useState('');
  const [about, setAbout] = useState('');
  const [image, setImage] = useState(null);
  const nav = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const schoolData = new FormData();
    schoolData.append('name', schoolName);
    schoolData.append('about', about);
    schoolData.append('image', image);
    try {
      const res = await instance.post('/addSchool', schoolData, {
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
          <input
            type="text"
            placeholder="School Name"
            value={schoolName}
            className="name-field"
            onChange={(e) => setSchoolName(e.target.value)}
          />
        </div>
        <div className="section">
          About
          <textarea
            placeholder="About"
            value={about}
            className="input-field"
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </div>
        <div className="section">
        Image
          <input
            type="file"
            name="image"
            className="input-file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default CreatePage;