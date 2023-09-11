import React from "react";
import MembershipHeader from "../../components/Membership-header";
import Navbar from "../../components/Navbar";
import MembershipServices from "../../components/MembershipServices";
import DarkTheme from "../../layouts/Dark";

const AboutDark = () => {
    const navbarRef = React.useRef(null);
    React.useEffect(() => {
        var navbar = navbarRef.current;
        if (window.pageYOffset > 300) {
            navbar.classList.add("nav-scroll");
        } else {
            navbar.classList.remove("nav-scroll");
        }
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) {
                navbar.classList.add("nav-scroll");
            } else {
                navbar.classList.remove("nav-scroll");
            }
        });
    }, [navbarRef]);
    return (
        <DarkTheme>
            <Navbar nr={navbarRef} />
            <MembershipHeader />
            <MembershipServices withPadding />
        </DarkTheme>
    );
};

export default AboutDark;
