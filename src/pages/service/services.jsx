import React from "react";
import NavbarFullMenu from "../../components/Navbar-full-menu/navbar-full-menu";
import Navbar from "../../components/Navbar";
import ShowcasesOneCenter from "../../components/Showcases-one-center";
import DarkTheme from "../../layouts/Dark";

const Showcase4Dark = () => {
  return (
    <DarkTheme>
      <Navbar />
      <ShowcasesOneCenter />
    </DarkTheme>
  );
};

export default Showcase4Dark;
