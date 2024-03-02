import { useState } from 'react';
import '../Pages/HomePage.css';

export default function SchoolPanel({ children, school}) {
    const [isExpanded, setIsExpanded ] = useState(false);

    return (
        <div className="school-card" onClick={() => setIsExpanded(!isExpanded)}>
            <div className="image-container">
                {children}
            </div>
            <div className="school-info">
                <h2 className="school-name">{school.name}</h2>
                <div className='wrapper'>
                    <div className="school-description">{isExpanded ? school.about : (school.about.slice(0,100) + '...')}</div>
                </div>
            </div>
        </div>
    );  
};