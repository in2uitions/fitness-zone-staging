/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import Link from "next/link";
import appData from "../../data/app.json";
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
      "to": '/about/about-dark'
    },
    {
      "id": 2,
      "label": "CLUBS",
      "children": [
        {
          "id": 3,
          "parentId": 2,
          "label": "Hamra",
          "to": '#'
        },
        {
          "id": 4,
          "parentId": 2,
          "label": "Manara",
          "to": '#'
        },
        {
          "id": 5,
          "parentId": 2,
          "label": "Dbayeh",
          "to": '#'
        },
        {
          "id": 6,
          "parentId": 2,
          "label": "Baabda",
          "to": '#'
        },
        {
          "id": 7,
          "parentId": 2,
          "label": "Achrafieh",
          "to": '#'
        },
      ]
    },
    {
      "id": 8,
      "label": "MEMBERSHIP",
      "to": "#"
    },
    {
      "id": 9,
      "label": "CLASSES",
      "children": [
        {
          "id": 10,
          "parentId": 8,
          "label": "classes",
          "to": '#'
        },
        {
          "id": 11,
          "parentId": 8,
          "label": "classes",
          "to": '#'
        },
        {
          "id": 12,
          "parentId": 8,
          "label": "classes",
          "to": '#'
        }
      ]
    },
    {
      "id": 13,
      "label": "SERVICES",
      "to": '#'

    },
    {
      "id": 14,
      "label": "CONTACT",
      "to": '/contact/contact-dark/'

    }
  ];
  const renderMenuItem = (item) => {
    if (item.children) {
      return (
        <li className="nav-item dropdown" key={item.id} onClick={handleDropdown}>
  <span
    className="nav-link dropdown-toggle"
    data-toggle="dropdown"
    role="button"
    aria-haspopup="true"
    aria-expanded="false"
  >
    {item.label}
  </span>
  <div className="dropdown-menu">
    {item.children.map((childItem) => (
      <Link href={childItem.to} key={childItem.id}>
        <a className="dropdown-item">{childItem.label}</a>
      </Link>
    ))}
  </div>
</li>
      );
    } else {
      return (
        <li className="nav-item" key={item.id}>
          <Link href={item.to}>
          <a href="#" className="nav-link">{item.label}</a>
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

    // console.log(ct);
    updateContent(ct);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };



  }, [data]);

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

  return (
    <nav
      ref={nr}
      className={`navbar navbar-expand-lg change ${theme === "themeL" ? "light" : ""
        }`}
    >
      <div className="container">
      <Link href="/">
                    <a className="logo">
                        {theme ? (
                            theme === "themeL" ? (
                                <img ref={lr} src="/newLogo.svg" alt="logo" />
                            ) : (
                                <img ref={lr} src="/newLogo.svg" alt="logo" />
                            )
                        ) : (
                            <img ref={lr} src="/newLogo.svg" alt="logo" />
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
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
