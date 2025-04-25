import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type ItemType = {
  name: string;
  assignedTo: string | null;
};

type Employee = {
  name: string;
  position: string;
  mailId: string;
  profileImage: string;
};

const DraggableItem = ({ name }: { name: string }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "ITEM",
    item: { name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: "8px",
        background: "#f0f0f0",
        marginBottom: "4px",
        cursor: "move",
      }}
    >
      {name}
    </div>
  );
};

const DropBox = ({
  title,
  boxId,
  items,
  onDropItem,
}: {
  title: string;
  boxId: string;
  items: ItemType[];
  onDropItem: (itemName: string, boxId: string) => void;
}) => {
  const [, dropRef] = useDrop(() => ({
    accept: "ITEM",
    drop: (item: { name: string }) => onDropItem(item.name, boxId),
  }));

  return (
    <div
      ref={dropRef}
      style={{
        minHeight: "200px",
        width: "200px",
        border: "2px dashed gray",
        padding: "10px",
        margin: "10px",
        background: "#fff",
      }}
    >
      <strong>{title}</strong>
      {items.map((i, index) => (
        <div
          key={index}
          style={{ padding: "6px", background: "#e6f7ff", marginTop: "5px" }}
        >
          {i.name}
        </div>
      ))}
    </div>
  );
};

const Assign = () => {
  const [items, setItems] = useState<ItemType[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const storedProjects = localStorage.getItem("projectFormDataList");
    const storedEmployees = localStorage.getItem("employee");

    if (storedProjects) {
      const projects = JSON.parse(storedProjects);
      const projectNames = projects.map(
        (project: { projectTitle: string }) => project.projectTitle
      );
      setItems(
        projectNames.map((name) => ({
          name,
          assignedTo: null,
        }))
      );
    }

    if (storedEmployees) {
      const employeeData: Employee[] = JSON.parse(storedEmployees);
      setEmployees(employeeData);
    }
  }, []);

  const handleDrop = (itemName: string, targetEmployee: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.name === itemName ? { ...item, assignedTo: targetEmployee } : item
      )
    );
  };

  const unassignedItems = items.filter((item) => item.assignedTo === null);

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: "20px" }}>
        <h3>Unassigned Projects</h3>
        {unassignedItems.length === 0 && <p>No unassigned projects</p>}
        {unassignedItems.map((item) => (
          <DraggableItem key={item.name} name={item.name} />
        ))}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          {employees.map((employee) => {
            const assignedItems = items.filter(
              (item) => item.assignedTo === employee.name
            );

            return (
              <DropBox
                key={employee.name}
                title={employee.name}
                boxId={employee.name}
                items={assignedItems}
                onDropItem={handleDrop}
              />
            );
          })}
        </div>

        <div style={{ marginTop: "40px" }}>
          <h3>Employee Details</h3>
          {employees.map((employee) => (
            <div key={employee.name} style={{ marginBottom: "20px" }}>
              <div>
                <strong>Name:</strong> {employee.name}
              </div>
              <div>
                <strong>Position:</strong> {employee.position}
              </div>
              <div>
                <strong>Email:</strong> {employee.mailId}
              </div>
              <img
                src={employee.profileImage}
                alt={employee.name}
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default Assign;
