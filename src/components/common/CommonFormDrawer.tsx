import React, { useEffect, useState } from "react";
import {
  Drawer,
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  Avatar,
} from "@mui/material";
import { AddPhotoAlternate, Close } from "@mui/icons-material";

interface FormDataType {
  name: string;
  position: string;
  mailId: string;
  profileImage: string;
  formName?: string;
}

interface CommonFormInDrawerProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormDataType) => void;
  initialData?: FormDataType | null;
  formName?: string;
}

const CommonFormInDrawer: React.FC<CommonFormInDrawerProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
  formName,
}) => {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    position: "",
    mailId: "",
    profileImage: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    position: false,
    mailId: false,
    profileImage: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImage: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = () => {
    let isValid = true;
    const newErrors = { ...errors };
    for (const key in formData) {
      const value = formData[key as keyof FormDataType];
      if (value === "") {
        newErrors[key as keyof typeof errors] = true;
        isValid = false;
      } else {
        newErrors[key as keyof typeof errors] = false;
      }
    }

    setErrors(newErrors);

    if (isValid) {
      console.log("Form Data:", formData);

      const storedData = localStorage.getItem("employee");
      console.log("Stored Data:", storedData); 
      const employeeList = storedData ? JSON.parse(storedData) : [];
      employeeList.push(formData); 
      localStorage.setItem("employee", JSON.stringify(employeeList));

      console.log(
        "Updated Data in LocalStorage:",
        localStorage.getItem("employee")
      );

      onSubmit(formData);
    }
  };

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ name: "", position: "", mailId: "", profileImage: "" });
    }
  }, [initialData, open]);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: 400,
          padding: "30px",
          borderRadius: "8px",
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {formName || "Common Form"}
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          helperText={errors.name && "Name is required"}
          fullWidth
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: "4px",
            },
          }}
        />
        <TextField
          label="Position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          error={errors.position}
          helperText={errors.position && "Position is required"}
          fullWidth
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: "4px",
            },
          }}
        />
        <TextField
          label="Official Mail ID"
          name="mailId"
          value={formData.mailId}
          onChange={handleChange}
          error={errors.mailId}
          helperText={errors.mailId && "Mail ID is required"}
          fullWidth
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: "4px",
            },
          }}
        />

        {/* Image Upload */}
        <Box>
          <Typography variant="body2" mb={1} sx={{ fontWeight: 500 }}>
            Profile Image (Required)
          </Typography>
          <IconButton
            color="primary"
            component="label"
            htmlFor="profile-image-upload"
          >
            <AddPhotoAlternate />
            <input
              type="file"
              id="profile-image-upload"
              accept="image/*"
              onChange={handleProfileImageChange}
              hidden
            />
          </IconButton>

          {formData.profileImage && (
            <Avatar
              alt="Profile"
              src={formData.profileImage}
              sx={{
                width: 80,
                height: 80,
                mt: 2,
                border: "2px solid #015d82",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            />
          )}
          {errors.profileImage && !formData.profileImage && (
            <Typography color="error" variant="body2">
              Profile image is required.
            </Typography>
          )}
        </Box>

        <Button
          variant="contained"
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
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Drawer>
  );
};

export default CommonFormInDrawer;
