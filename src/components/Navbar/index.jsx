/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";

import {
  handleDropdown,
  handleMobileDropdown,
  handleSearch,
} from "../../common/navbar";
import { useRouter } from "next/router";
const Navbar = ({ lr, nr, theme, data = {} }) => {
  // React.useEffect(() => {
  //   handleSearch();
  // }, []);
  const pathname = useRouter().pathname;
  const router = useRouter();
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  const [search, updateSearch] = useState('');
  const [index, updateIndex] = useState(0);
  const [content, updateContent] = useState([]);
  var ct = [
    {
      "id": 1,
      "label": "ABOUT THE ZONE",
      "to": '/about/about-us'
    },
    {
      "id": 2,
      "label": "CLUBS",
      "children": [
        {
          "id": 3,
          "parentId": 2,
          "label": "All Clubs",
          "to": '/about/clubs',
        },
        {
          "id": 4,
          "parentId": 2,
          "label": "Hamra",
          "to": '/hamra/hamra-homepage'
        },
        {
          "id": 5,
          "parentId": 2,
          "label": "Manara",
          "to": '/manara/manara-homepage'
        },
        {
          "id": 6,
          "parentId": 2,
          "label": "Dbayeh",
          "to": '/dbayeh/dbayeh-homepage'
        },
        {
          "id": 7,
          "parentId": 2,
          "label": "Baabda",
          "to": '/baabda/baabda-homepage'
        },
        {
          "id": 8,
          "parentId": 2,
          "label": "Achrafieh",
          "to": '/achrafieh/achrafieh-homepage'
        },
      ]
    },
    {
      "id": 8,
      "label": "MEMBERSHIP",
      "to": "/about/membership"
    },
    {
      "id": 9,
      "label": "CLASSES",
      "to": "/about/gx-classes"
    },
    {
      "id": 13,
      "label": "PERSONAL TRAINING",
      "to": '/about/personal-training'
    },
    {
      "id": 14,
      "label": "CONTACT",
      "to": '/about/contact-us'
    }
  ];
  const renderMenuItem = (item) => {
    if (item.children) {
      return (
        <li className="nav-item dropdown" key={item.id} onClick={handleDropdown}>
         
            <a className="dropdown-toggle nav-link" data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false">{item.label}</a>
          <div className="dropdown-menu">
            {item.children.map((childItem) => (
              <Link href={childItem.to} key={childItem.id}>
                <a href={childItem.to} className="dropdown-item">{childItem.label}</a>
              </Link>
            ))}
          </div>
          
        </li>
      );
    } else {
      return (
        <li className="nav-item" key={item.id}>
          <Link href={item.to}>
            <a href={item.to} className="nav-link">{item.label}</a>
          </Link>
          
        </li>
      );
    }
  };
  const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      router.push('/results-page?search=' + search)
    }
  }
  useEffect(() => {
    const menuItems = document.querySelectorAll('.metismenu-container .metismenu-item');
    menuItems.forEach(item => {
      item.classList.replace('metismenu-item', 'nav-item');
    });
    window.addEventListener('scroll', handleScroll, { passive: true });
    console.log(ct);
    updateContent(ct);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    const handleRouteChange = (url) => {
      // setIsSidebarOpen(false)
      if (url.includes("software") || url.includes("deployment")) {
        updateIndex(0);
      }
      if (url.includes("business") || url.includes("industries") || url.includes("hardware")) {
        updateIndex(1);
      }
      if (url.includes("about")) {
        updateIndex(2);
      }
      if (url.includes("about") || url.includes("support")) {
        updateIndex(3);
      }
      if (url.includes("resources")) {
        updateIndex(4);
      }
    }
    handleRouteChange(router.pathname)
    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, []);
  const [scrolling, setScrolling] = React.useState(false);
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <nav
        ref={nr}
        className={`navbar navbar-expand-lg change ${theme === "themeL" ? "light" : ""
          }`}
      >
        <div className="container">
          <Link href="/">
            <a className="">
              {scrolling ? (
                <img ref={lr} className="new-logo" src="/newLogo.svg" alt="logo" style={{ width: "70%" }} />
              ) : (
                <img ref={lr} className="new-logo" src="/logo.svg" alt="logo" style={{ width: "70%" }} />
              )}
            </a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={handleMobileDropdown}
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="icon-bar">
              <i className="fas fa-bars"></i>
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              {content.map((item) => renderMenuItem(item))}
              <li className="nav-item">
              <a href="/account/login" className="webhidden nav-link" style={{
          background: "rgb(25, 144, 223)",
          padding: "5px 15px 5px 15px",
          color: "white",
          borderRadius: "5px",
          width:"50%",
          border: "0px solid transparent"
        }}>Login</a>
        </li>
            </ul>
            
          </div>
          <a href="/account/login" className="loginMobileHidden" style={{
            background: "rgb(25, 144, 223)",
            padding: "5px 15px 5px 15px",
            color: "white",
            borderRadius: "5px",
            border: "0px solid transparent"
          }}>Login</a>
        </div>

      </nav>
    </>
  );
};
export default Navbar;