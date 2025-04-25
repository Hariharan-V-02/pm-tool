import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Modal,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Projectform from "../common/project-form";

interface FormDataType {
  projectTitle: string;
  assignedEmployees: string;
  startDate: string;
  endDate: string;
  projectDescription: string;
  profileImage: string;
}
const LOCAL_STORAGE_KEY = "projectFormDataList";

const Projectmanagement: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormDataType[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<FormDataType | null>(
    null
  );
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      setSubmittedData(JSON.parse(storedData));
    } else {
      const sample = [
        {
          projectTitle: "Demo Project",
          assignedEmployees: "John Doe",
          startDate: "2024-01-01",
          endDate: "2024-12-31",
          projectDescription: "This is a demo project",
          profileImage: "https://via.placeholder.com/60",
        },
      ];
      setSubmittedData(sample);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sample));
    }
  }, []);

  const handleSubmit = (data: FormDataType) => {
    let updatedData: FormDataType[];

    if (editIndex !== null) {
      updatedData = [...submittedData];
      updatedData[editIndex] = data;
      setEditIndex(null);
    } else {
      updatedData = [...submittedData, data];
    }

    setSubmittedData(updatedData);
    // Update local storage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
    setOpen(false);
  };

  const confirmDelete = () => {
    if (projectToDelete !== null) {
      const newData = [...submittedData];
      newData.splice(projectToDelete, 1);
      setSubmittedData(newData);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
      setProjectToDelete(null);
      setOpenDeleteDialog(false);
    }
  };

  const handleDelete = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setProjectToDelete(index);
    setOpenDeleteDialog(true);
  };

  // const confirmDelete = () => {
  //   if (projectToDelete !== null) {
  //     const newData = [...submittedData];
  //     newData.splice(projectToDelete, 1);
  //     setSubmittedData(newData);
  //     setProjectToDelete(null);
  //     setOpenDeleteDialog(false);
  //   }
  // };

  const cancelDelete = () => {
    setOpenDeleteDialog(false);
    setProjectToDelete(null);
  };

  const handleEdit = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setEditIndex(index);
    setOpen(true);
  };

  const handleProjectClick = (project: FormDataType) => {
    setSelectedProject(project);
  };

  const EMPLOYEE_STORAGE_KEY = "employee";

  const employees: string[] = React.useMemo(() => {
    const stored = localStorage.getItem(EMPLOYEE_STORAGE_KEY);
    if (!stored) return [];
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && typeof parsed[0] === "object" && parsed[0]?.name) {
        return parsed.map((emp: { name: string }) => emp.name);
      }
      if (Array.isArray(parsed) && typeof parsed[0] === "string") {
        return parsed;
      }
    } catch (e) {
      console.error("Invalid employee data in local storage", e);
    }
    return [];
  }, []);
  
  return (
    <Box sx={{ p: 4 }}>
      {/* Create Project Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          position: "sticky",
          zIndex: 10,
          backgroundColor: "#fff",
        }}
      >
        <Button
          sx={{
            width: "130px",
            height: "34px",
            borderRadius: "6px",
            opacity: 1,
            textTransform: "none",
            backgroundColor: "#015d82",
            color: "white",
            "&:hover": {
              backgroundColor: "#015d82",
            },
          }}
          onClick={() => {
            setEditIndex(null);
            setOpen(true);
          }}
        >
          Create Project
        </Button>
      </Box>

      {/* Project Cards */}
      <Box sx={{ mt: 1, display: "flex", gap: 2, flexWrap: "wrap" }}>
        {submittedData.map((item, idx) => (
          <Card
            key={idx}
            sx={{ width: 250, position: "relative" }}
            onClick={() => handleProjectClick(item)}
          >
            <CardContent>
              <Avatar
                src={item.profileImage}
                sx={{ width: 60, height: 60, mb: 1 }}
              />
              <Typography variant="h6">{item.projectTitle}</Typography>
              <Typography variant="body2">
                Project Description: {item.projectDescription}
              </Typography>
              <Typography variant="body2">
                Start Date: {item.startDate}
              </Typography>
              <Typography variant="body2">End Date: {item.endDate}</Typography>
              <Typography variant="body2">
                Assigned Employees: {item.assignedEmployees}
              </Typography>
              <Box
                sx={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  display: "flex",
                  gap: 1,
                }}
              >
                <IconButton onClick={(event) => handleEdit(idx, event)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={(event) => handleDelete(idx, event)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Project Form Modal */}
      <Projectform
        open={open}
        onClose={() => {
          setOpen(false);
          setEditIndex(null);
        }}
        onSubmit={handleSubmit}
        initialData={editIndex !== null ? submittedData[editIndex] : null}
        formName="Project Form"
        employees={employees}
      />

      {/* Project Details Modal */}
      <Modal
        open={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "#f4f3f3",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          {selectedProject ? (
            <>
              <Avatar
                src={selectedProject.profileImage}
                sx={{
                  width: 100,
                  height: 100,
                  mb: 2,
                  border: "3px solid #015d82",
                }}
              />
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", mb: 2, color: "#000000" }}
              >
                Project-Title: {selectedProject.projectTitle}
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 2, fontStyle: "italic", color: "#000000" }}
              >
                Project-Description: {selectedProject.projectDescription}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, color: "#000000" }}>
                <strong>Start Date:</strong> {selectedProject.startDate}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, color: "#000000" }}>
                <strong>End Date:</strong> {selectedProject.endDate}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: "#000000" }}>
                <strong>Assigned Employees:</strong>{" "}
                {selectedProject.assignedEmployees}
              </Typography>
            </>
          ) : (
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              No project details available
            </Typography>
          )}
        </Box>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this project?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Projectmanagement;
