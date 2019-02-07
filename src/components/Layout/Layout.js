import React from "react";
const layout = props => (
  <>
    <div>Toolbar, Sidebar, Menu</div>
    <main>{props.children}</main>
  </>
);

export default layout;
