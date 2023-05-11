import data from "./data/table.json";

console.log(data);

// Function accepts a first and last name
// separated by a space, and returns the first
// and last initial along with a varying color

export function generate_avatar_data(name) {
  name = name || "";

  var colours = [
    "#1abc9c",
    "#2ecc71",
    "#3498db",
    "#9b59b6",
    "#34495e",
    "#16a085",
    "#27ae60",
    "#2980b9",
    "#8e44ad",
    "#2c3e50",
    "#f1c40f",
    "#e67e22",
    "#e74c3c",
    "#061417",
    "#95a5a6",
    "#f39c12",
    "#d35400",
    "#c0392b",
    "#bdc3c7",
    "#7f8c8d"
  ];

  const cleanName = name.replace(/[!@#$%^&*]/g, "").replace(/\s+/g, " ");

  var nameSplit = String(cleanName).toUpperCase().split(" ");

  var initials;
  var lastinitial;
  if (nameSplit.length == 1) {
    initials = nameSplit[0] ? nameSplit[0].charAt(0) : "?";
    lastinitial = initials;
  } else {
    initials = nameSplit[0].charAt(0) + nameSplit[1].charAt(0);
    lastinitial = nameSplit[1].charAt(0);
  }

  var charIndex = (lastinitial == "?" ? 72 : lastinitial.charCodeAt(0)) - 64;
  var colourIndex = charIndex % 20;

  return { initials: initials, color: colours[colourIndex] };
}

// Render the category tag based on the object type
export function renderCategoryTag(objectType) {
  // Define the mapping of object types to category tags
  const categoryTags = {
    FS: "Form Submission",
    AP: "Appointment"
    // Add more mappings as needed
  };

  // Check if the object type exists in the mapping
  if (categoryTags.hasOwnProperty(objectType)) {
    return categoryTags[objectType];
  }

  return "Unknown"; // Default category tag if object type is not found
}

// Render the description based on the notification or action object
export function renderDescription(data) {
  let description = "";

  // Check if the data object is a notification or action
  if (data.hasOwnProperty("notification_id")) {
    // Handle notification description rendering
    description = `Notification: ${data.notification_id}`;
  } else if (data.hasOwnProperty("action_id")) {
    // Handle action description rendering
    description = `Action: ${data.action_id}`;
  }

  return description;
}

// Function to filter activities based on event type
export function filterActivities(actions, activityFilter) {
  if (!activityFilter) {
    return actions;
  }

  return actions.filter((action) => action.event_type.includes(activityFilter));
}

// Function to filter notifications based on status and type
export function filterNotifications(notifications, statusFilter, typeFilter) {
  let filteredNotifications = notifications;

  if (statusFilter !== "all") {
    filteredNotifications = filteredNotifications.filter(
      (notification) => notification.status === statusFilter
    );
  }

  if (typeFilter !== "all") {
    filteredNotifications = filteredNotifications.filter(
      (notification) => notification.object_type === typeFilter
    );
  }

  return filteredNotifications;
}

// Function to change the status of an action
export function changeStatus(actions, itemId, newStatus) {
  return actions.map((action) => {
    if (action.id === itemId) {
      return { ...action, status: newStatus };
    }
    return action;
  });
}
