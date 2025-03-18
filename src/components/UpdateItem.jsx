import { useState, useEffect } from "react";

const UpdateItem = ({ item }) => {
  // Ensure item is always an object (fallback to empty object if undefined)
  const [updatedValue, setUpdatedValue] = useState(item?.name || "");

  useEffect(() => {
    if (item) {
      setUpdatedValue(item.name);
    }
  }, [item]); // Update the state when the item changes

  const handleInputChange = (e) => {
    setUpdatedValue(e.target.value);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://your-api.com/items/${item?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: updatedValue }),
      });

      if (!response.ok) throw new Error("Failed to update item");

      const updatedItem = await response.json();
      console.log("Updated Item:", updatedItem);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // If `item` is still undefined, show a loading state
  if (!item) return <p>Loading item...</p>;

  return (
    <form onSubmit={handleUpdate}>
      <h2>Update Item</h2>
      <input type="text" value={updatedValue} onChange={handleInputChange} />
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateItem;
