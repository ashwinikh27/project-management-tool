import React, { useEffect, useState } from "react";
import API from "../services/api";

function Projects() {

  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async () => {

    await API.post("/projects", {
      title,
      description
    });

    fetchProjects();

  };

  const deleteProject = async (id) => {

    await API.delete(`/projects/${id}`);

    fetchProjects();

  };

  return (
    <div>

      <h2>Projects</h2>

      <div>

        <input
          placeholder="Project title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={createProject}>
          Create Project
        </button>

      </div>

      <ul>

        {projects.map((project) => (

          <li key={project._id}>

            <h4>{project.title}</h4>

            <p>{project.description}</p>

            <button
              onClick={() => deleteProject(project._id)}
            >
              Delete
            </button>

          </li>

        ))}

      </ul>

    </div>
  );
}

export default Projects;