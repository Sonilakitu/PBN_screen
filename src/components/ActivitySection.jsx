import React, { useState } from "react";
import notificationsData from "../data/notifications.json";
import actionsData from "../data/actions.json";
import {
  generate_avatar_data,
  renderCategoryTag,
  renderDescription
} from "../utility";

function ActivitySection() {
  const [filterEventType, setFilterEventType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Apply filters to notifications and actions data
  const filteredNotifications = notificationsData.filter(
    (notification) =>
      notification.event_type.includes(filterEventType) &&
      (filterStatus === "all" || notification.status === filterStatus)
  );

  const filteredActions = actionsData.filter((action) =>
    action.event_type.includes(filterEventType)
  );

  
  
  // Handle filter changes
  const handleEventTypeFilterChange = (event) => {
    setFilterEventType(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor="event-type-filter">Filter by Event Type:</label>
        <select id="event-type-filter" onChange={handleEventTypeFilterChange}>
          <option value="">All</option>
          {/* Add event type options dynamically */}
        </select>
      </div>

      <div>
        <label htmlFor="status-filter">Filter by Status:</label>
        <select id="status-filter" onChange={handleStatusFilterChange}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="ignored">Ignored</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <h2>Notifications</h2>
      <table>
        <thead>
          <tr>
            <th>Event Type</th>
            <th>Status</th>
            <th>Category</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredNotifications.map((notification) => (
            <tr key={notification.id}>
              <td>{notification.event_type}</td>
              <td>{notification.status}</td>
              <td>{renderCategoryTag(notification.object_type)}</td>
              <td>{renderDescription(notification)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Action Needed</h2>
      <table>
        <thead>
          <tr>
            <th>Event Type</th>
            <th>Avatar</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredActions.map((action) => (
            <tr key={action.id}>
              <td>{action.event_type}</td>
              <td>
                <div
                  style={{
                    backgroundColor: generate_avatar_data(
                      `${action.patient_first_name} ${action.patient_last_name}`
                    ).color
                  }}
                >
                  {
                    generate_avatar_data(
                      `${action.patient_first_name} ${action.patient_last_name}`
                    ).initials
                  }
                </div>
              </td>
              <td>{renderDescription(action)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActivitySection;
