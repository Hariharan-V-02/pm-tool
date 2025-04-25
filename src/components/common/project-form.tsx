import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Drawer,
  Typography,
  Input,
  IconButton,
  Autocomplete,
} from "@mui/material";
import { Close } from "@mui/icons-material";

interface FormDataType {
  projectTitle: string;
  assignedEmployees: string;
  startDate: string;
  endDate: string;
  projectDescription: string;
  profileImage: string;
}

interface ProjectFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormDataType) => void;
  initialData: FormDataType | null;
  formName: string;
  employees: string[];
}

const Projectform: React.FC<ProjectFormProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
  formName,
  employees,
}) => {
  const [formData, setFormData] = useState<FormDataType>({
    projectTitle: "",
    assignedEmployees: "",
    startDate: "",
    endDate: "",
    projectDescription: "",
    profileImage: "",
  });

  const [errors, setErrors] = useState<Partial<FormDataType>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profileImage: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const validationErrors: Partial<FormDataType> = {};

    if (!formData.projectTitle)
      validationErrors.projectTitle = "Project title is required";
    if (!formData.assignedEmployees)
      validationErrors.assignedEmployees = "Assigned employees are required";
    if (!formData.startDate)
      validationErrors.startDate = "Start date is required";
    if (!formData.endDate) validationErrors.endDate = "End date is required";
    if (!formData.projectDescription)
      validationErrors.projectDescription = "Project description is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const existingData = localStorage.getItem("projectFormDataList");
    const formDataList: FormDataType[] = existingData
      ? JSON.parse(existingData)
      : [];

    const updatedList = [...formDataList, formData];
    localStorage.setItem("projectFormDataList", JSON.stringify(updatedList));

    onSubmit(formData);

    setFormData({
      projectTitle: "",
      assignedEmployees: "",
      startDate: "",
      endDate: "",
      projectDescription: "",
      profileImage: "",
    });
    onClose();
  };

  useEffect(() => {
    const savedList = localStorage.getItem("projectFormDataList");
    if (savedList) {
      const formDataList = JSON.parse(savedList) as FormDataType[];
      const lastForm = formDataList[formDataList.length - 1];
      if (lastForm) setFormData(lastForm);
    }
  }, []);
  useEffect(() => {
    if (open) {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData({
          projectTitle: "",
          assignedEmployees: "",
          startDate: "",
          endDate: "",
          projectDescription: "",
          profileImage: "",
        });
      }
      setErrors({});
    }
  }, [open, initialData]);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ p: 2, width: 400, position: "relative" }}>
        <Typography variant="h6">{formName}</Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 10, right: 10 }}
        >
          <Close />
        </IconButton>
        <TextField
          fullWidth
          label="Project Title"
          name="projectTitle"
          value={formData.projectTitle}
          onChange={handleChange}
          required
          error={!!errors.projectTitle}
          helperText={errors.projectTitle}
          sx={{ mt: 2 }}
        />
        <Autocomplete
          fullWidth
          options={employees}
          value={formData.assignedEmployees}
          onChange={(e, value) =>
            setFormData({ ...formData, assignedEmployees: value || "" })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Assigned Employees"
              name="assignedEmployees"
              required
              error={!!errors.assignedEmployees}
              helperText={errors.assignedEmployees}
              sx={{ mt: 2 }}
            />
          )}
        />
        <TextField
          fullWidth
          label="Start Date"
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
          error={!!errors.startDate}
          helperText={errors.startDate}
          sx={{ mt: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          label="End Date"
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
          error={!!errors.endDate}
          helperText={errors.endDate}
          sx={{ mt: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          label="Project Description"
          name="projectDescription"
          value={formData.projectDescription}
          onChange={handleChange}
          required
          error={!!errors.projectDescription}
          helperText={errors.projectDescription}
          sx={{ mt: 2 }}
        />

        <Box sx={{ mt: 2 }}>
          <Input
            type="file"
            onChange={handleFileChange}
            sx={{ width: "100%" }}
          />
          {formData.profileImage && (
            <img
              src={formData.profileImage}
              alt="Project Logo"
              style={{ marginTop: 10, width: "100px", height: "auto" }}
            />
          )}
        </Box>

        <Button
          sx={{
            textTransform: "none",
            backgroundColor: "#015d82",
            color: "white",
            borderRadius: "4px",
            padding: "10px",
            "&:hover": {
              backgroundColor: "#013c53",
            },
          }}
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Drawer>
  );
};

export default Projectform;
