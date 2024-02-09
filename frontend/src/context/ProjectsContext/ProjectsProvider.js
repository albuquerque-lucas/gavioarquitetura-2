import PropTypes from 'prop-types';
import { useMemo, useState } from "react";
import ProjectsContext from "./ProjectsContext";

export default function ProjectsProvider({ children }) {
  const [selectAllImages, setSelectAllImages] = useState(false);
  const [projectImages, setProjectImages] = useState([]);
  const [imagesSearchSort, setImagesSearchSort] = useState('desc');
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [paramsList, setParamsList] = useState({
    attribute: 'id',
    hasAttribute: true,
    order: 'desc',
  });
  const [nextPageLink, setNextPageLink] = useState(null);
  const [previousPageLink, setPreviousPageLink] = useState(null);
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

  const [projectFilter, setProjectFilter] = useState({
    id: "Id",
    name: "Nome",
    active_carousel: "Em exibicao na pagina inicial",
    innactive_carousel: "Nao em exibicao na pagina inicial",
    with_image: "Possui imagem",
    without_image: "Nao possui imagem",
  });

  const [selectedFilter, setSelectedFilter] = useState("id");

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

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
      navigationLinks,
      setNavigationLinks,
      selectedSearchSort,
      setSelectedSearchSort,
      projectFilter,
      setProjectFilter,
      selectedFilter,
      setSelectedFilter,
      selectedCategoryId,
      setSelectedCategoryId,
      nextPageLink,
      setNextPageLink,
      previousPageLink,
      setPreviousPageLink,
      paramsList,
      setParamsList,
      projectImages,
      setProjectImages,
      imagesSearchSort,
      setImagesSearchSort,
      selectAllImages,
      setSelectAllImages,
      selectedCheckboxes,
      setSelectedCheckboxes,
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
    navigationLinks,
    setNavigationLinks,
    selectedSearchSort,
    setSelectedSearchSort,
    projectFilter,
    setProjectFilter,
    selectedFilter,
    setSelectedFilter,
    selectedCategoryId,
    setSelectedCategoryId,
    nextPageLink,
    setNextPageLink,
    previousPageLink,
    setPreviousPageLink,
    paramsList,
    setParamsList,
    projectImages,
    setProjectImages,
    imagesSearchSort,
    setImagesSearchSort,
    selectAllImages,
    setSelectAllImages,
    selectedCheckboxes,
    setSelectedCheckboxes,
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
