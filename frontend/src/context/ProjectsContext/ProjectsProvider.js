import PropTypes from 'prop-types';
import { useMemo, useState } from "react";
import ProjectsContext from "./ProjectsContext";

export default function ProjectsProvider({ children }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [navigationLinks, setNavigationLinks] = useState([]);
  const [selectedSearchSort, setSelectedSearchSort] = useState('desc');
  const [editMode, setEditMode] = useState({
    image_url: false,
    active_carousel: false,
    name: false,
    category_id: false,
    area: false,
    year: false,
    address: false,
    description: false,
  });
  const [projectFormData, setProjectFormData] = useState({
    name: "",
    description: "",
    area: "",
    year: "",
    address: "",
    image_url: "",
    category_id: "0",
    active_carousel: "0",
  });
  const [projectList, setProjectList] = useState([]);
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    description: "",
    area: "",
    year: "",
    address: "",
    image_url: "",
    category_id: "0",
    active_carousel: "0",
  });
  const [editedDetails, setEditedDetails] = useState({
    name: "",
    description: "",
    area: "",
    year: "",
    address: "",
    image_url: "",
    category_id: "0",
    active_carousel: "0",
  });

  const context = useMemo(() => {
    const handleChange = (field, value) => {
      setEditedDetails({
        ...editedDetails,
        [field]: value,
      });
    };

    return {
      projectList,
      setProjectList,
      projectDetails,
      setProjectDetails,
      editedDetails,
      setEditedDetails,
      handleChange,
      editMode,
      setEditMode,
      projectFormData,
      setProjectFormData,
      currentPage,
      setCurrentPage,
      lastPage,
      setLastPage,
      navigationLinks,
      setNavigationLinks,
      selectedSearchSort,
      setSelectedSearchSort,
    };
  }, [
    projectList,
    setProjectList,
    projectDetails,
    setProjectDetails,
    editedDetails,
    setEditedDetails,
    editMode,
    setEditMode,
    projectFormData,
    setProjectFormData,
    currentPage,
    setCurrentPage,
    lastPage,
    setLastPage,
    navigationLinks,
    setNavigationLinks,
    selectedSearchSort,
    setSelectedSearchSort,
  ]);

  return (
    <ProjectsContext.Provider value={context}>
      {children}
    </ProjectsContext.Provider>
  );
}

ProjectsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
