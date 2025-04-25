import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Modal,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CommonFormInDrawer from "../common/CommonFormDrawer";

interface FormDataType {
  name: string;
  position: string;
  mailId: string;
  profileImage: string;
}

const LOCAL_STORAGE_KEY = "employee";

const UserFormPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormDataType[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<FormDataType | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      setSubmittedData(JSON.parse(storedData));
    } else {
      const defaultData = [
        {
          name: "Jane Doe",
          position: "Frontend Developer",
          mailId: "jane.doe@example.com",
          profileImage: "https://i.pravatar.cc/60?img=3"
        },
      ];
      setSubmittedData(defaultData);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultData));
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
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
    setOpen(false);
  };

  const handleDelete = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setUserToDelete(index);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (userToDelete !== null) {
      const updated = [...submittedData];
      updated.splice(userToDelete, 1);
      setSubmittedData(updated);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      setUserToDelete(null);
      setOpenDeleteDialog(false);
    }
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false);
    setUserToDelete(null);
  };

  const handleEdit = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setEditIndex(index);
    setOpen(true);
  };

  const handleUserClick = (user: FormDataType) => {
    setSelectedUser(user);
  };

  return (
    <Box sx={{ p: 4 }}>
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
            width: "90px",
            height: "34px",
            borderRadius: "6px",
            opacity: 1,
            textTransform: "none",
            backgroundColor: "#015d82",
            color: "white",
            "&:hover": {
              backgroundColor: "#014d72",
            },
          }}
          onClick={() => {
            setEditIndex(null);
            setOpen(true);
          }}
        >
          Add User
        </Button>
      </Box>

      {/* User Cards */}
      <Box sx={{ mt: 1, display: "flex", gap: 2, flexWrap: "wrap" }}>
        {submittedData.map((item, idx) => (
          <Card
            key={idx}
            sx={{ width: 250, position: "relative", cursor: "pointer" }}
            onClick={() => handleUserClick(item)}
          >
            <CardContent>
            <Avatar
  src={item.profileImage || "https://i.pravatar.cc/60?img=3"}
  sx={{ width: 60, height: 60, mb: 1 }}
/>

              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body2">Position: {item.position}</Typography>
              <Typography variant="body2">Mail: {item.mailId}</Typography>
              <Box
                sx={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  display: "flex",
                  gap: 1,
                }}
              >
                <IconButton onClick={(e) => handleEdit(idx, e)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={(e) => handleDelete(idx, e)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Form Drawer */}
      <CommonFormInDrawer
        open={open}
        onClose={() => {
          setOpen(false);
          setEditIndex(null);
        }}
        onSubmit={handleSubmit}
        initialData={editIndex !== null ? submittedData[editIndex] : null}
        formName="Employee Form"
      />

      {/* User Details Modal */}
      <Modal open={Boolean(selectedUser)} onClose={() => setSelectedUser(null)}>
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
          {selectedUser && (
            <>
              <Avatar
                src={selectedUser.profileImage}
                sx={{ width: 100, height: 100, mb: 2 }}
              />
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 2, color: "#000000" }}
              >
                {selectedUser.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ mt: 2, fontStyle: "italic", color: "#000000" }}
              >
                Position: {selectedUser.position}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, color: "#000000" }}>
                Mail: {selectedUser.mailId}
              </Typography>
            </>
          )}
        </Box>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserFormPage;
