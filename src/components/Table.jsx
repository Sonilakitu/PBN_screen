import React, { useState } from "react";
import data from "../data/table.json";
import "./Table.css";

const TableComponent = () => {
  const [groupBy, setGroupBy] = useState("paytype_id");

  // Function to group and sum the data based on the selected attribute
  const groupAndSumData = () => {
    const groupedData = {};

    // Group and sum the data based on the selected attribute
    data.values.forEach((item) => {
      const key = `${item.date}_${item[groupBy]}`;
      if (groupedData[key]) {
        groupedData[key].amount += item.amount;
      } else {
        groupedData[key] = {
          ...item,
          paytype_id: groupBy === "paytype_id" ? item.paytype_id : undefined,
          provider_id: groupBy === "provider_id" ? item.provider_id : undefined,
          employee_type_id:
            groupBy === "employee_type_id" ? item.employee_type_id : undefined
        };
      }
    });
    // Convert the grouped data object to an array
    const groupedDataArray = Object.values(groupedData);

    return groupedDataArray;
  };

  // Function to handle the change in groupBy selection
  const handleGroupByChange = (e) => {
    setGroupBy(e.target.value);
  };

  // Get the grouped and summed data based on the selected attribute
  const groupedData = groupAndSumData();

  return (
    <div>
      <h2>Data Table</h2>
      <label>
        Group By:
        <select value={groupBy} onChange={handleGroupByChange}>
          <option value="paytype_id">Paytype ID</option>
          <option value="employee_type_id">Employee Type ID</option>
          <option value="provider_id">Provider ID</option>
        </select>
      </label>
      <table className="data-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>{groupBy}</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {groupedData.map((item) => (
            <tr key={`${item.date}_${item[groupBy]}`}>
              <td>{item.date}</td>
              <td>{item[groupBy]}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
