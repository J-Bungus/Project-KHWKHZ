// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SchoolPanel from '../Components/SchoolPanel';

const HomePage = () => {
  const instance = axios.create({ baseURL: 'https://dreamschools-182388d60dc9.herokuapp.com'});
  const [ schoolList, setSchoolList ] = useState([]);

  useEffect(() => {
    instance.get('/getSchools', {count: 10}, {
          headers: {
            'Content-Type': 'application/json'
          }
    }).then(res => {
      const data = res.data;
      setSchoolList(data);
    });
  }, []);

  return (
    <div className="homepage">
      <h1 className="title">Home</h1>
      <Link to="/create" className="create-link">
        <button>Create a Listing</button>
      </Link>
      <div className="center">
        <div className="school-list">
          {!schoolList ? <div>Welcome! To add listings click the "Create a Listing" button.</div> : schoolList.map((school, index) => (
            <SchoolPanel key={index} school={school}>
              <img src={school.blobURL} alt={school.name} className="school-image"/>
            </SchoolPanel>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
