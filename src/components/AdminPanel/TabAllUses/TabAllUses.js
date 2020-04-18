import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

const TabAllUses = props => {
  const columns = [
    {
      dataField: "id",
      text: "ID"
    },
    {
      dataField: "username",
      text: "Name",
      filter: textFilter()
    },
    {
      dataField: "created_at",
      text: "Created on"
    },
    {
      dataField: "adm",
      text: "Admin"
    },
    {
      dataField: "active",
      text: "Active"
    },
    {
      dataField: "email",
      text: "Email",
      filter: textFilter()
    },
    {
      dataField: "room_id",
      text: "Room"
    }
  ];
  return (
    <BootstrapTable
      keyField="id"
      data={props.allUsers}
      columns={columns}
      filter={filterFactory()}
      classes="allRoomsTable"
    />
  );
};

export default TabAllUses;
