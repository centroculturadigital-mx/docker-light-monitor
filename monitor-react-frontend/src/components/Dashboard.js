import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { request, gql } from 'graphql-request';
import { useAsciiText, threeDAscii } from 'react-ascii-text';

const projectsQuery = gql`
  query {
    projects {
      id
      title
      url
      metrics (orderBy: {id: desc}, take: 1) {
        cpu
        ram
      }
    }
  }
`;

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const asciiTextRef = useAsciiText({
    font: threeDAscii,
    text: `MONITOR DE 
    PROYECTOS`,
    animationLoop: false,
    fadeInOnly: true,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log('REACT_APP_BACKEND_URL', process.env.REACT_APP_BACKEND_URL)
        console.log('REACT_APP_BACKEND_URL2', process.env.REACT_APP_BACKEND_URL2)
        console.log('REACT_APP_BACKEND_URL3', process.env.REACT_APP_BACKEND_URL3)
        const response = await request(`${process.env.REACT_APP_BACKEND_URL}/api/graphql`, projectsQuery);
        const response2 = await request(`${process.env.REACT_APP_BACKEND_URL2}/api/graphql`, projectsQuery);
        const response3 = await request(`${process.env.REACT_APP_BACKEND_URL3}/api/graphql`, projectsQuery);
        setProjects([...response.projects, ...response2.projects, ...response3.projects]);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <pre style={{marginLeft: '50px', fontWeight: "bold", fontSize: "0.7rem"}} className="ascii-art" ref={asciiTextRef}></pre>
      <ul>
        {projects.length > 0 ? (
          projects.map((p) => (
            <li key={p.id} style={{display: "flex", alignItems: "center"}}>
              <div style={{display: "flex", flex: 1}}>
                <img style={{height: "30px", marginRight: "10px"}} src="/dashboard/dobleArrow.png" alt="arrow" />
                <Link to={`/dashboard/${p.id}`}>{p.title}</Link>
                <div className='divisor'></div>
              </div>
              <img style={{height: "30px"}} src="/dashboard/curlyArrow.jpg" alt="arrow2" />
              <a style={{margin: "0 20px"}} href={p.url} rel="noreferrer" target="_blank">{p.url ? p.url.replace(/^https?:\/\//, ''): ''} [↗]</a>
              <img style={{height: "30px"}} src="/dashboard/curlyArrow.jpg" alt="arrow2" />
              <div style={{margin: "0 20px"}}>CPU: {p.metrics[0].cpu} |||| RAM: {p.metrics[0].ram}</div>
            </li>
          ))
        ) : (
          <li>No projects found</li>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
