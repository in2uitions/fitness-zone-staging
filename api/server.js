import axios from 'axios';
import { Directus } from '@directus/sdk';
import { URL } from '../global_vars';

const directus = new Directus(URL);

export const handleApi = async ({ url, query = {}, fields, slug, load = true }) => {
    if (!fields) {
        var fields = ['*,header.*.*.*,sections.*,sections.item.*.*.*.*'];


    }
    var filter = null;
    if (slug != null) {
        filter = {
            "slug": {
                "_eq": slug,
            }
        }
    }

    const res = await directus.items(url).readByQuery({ fields: fields, query, filter })

    return res.data;
}

export const getClasses = async (value) => {
    const classes = directus.items('classes');

    var myfilter = '';
    var max = '1'
    if (value) {
        myfilter = {
            "status": {
                "_eq": 'published',
            }
        }
    }
    else {
        myfilter = {
            "status": {
                "_eq": 'published',
            },


        }

    }


    var myfields = ['*']
    const classesPublished = await classes.readByQuery({ filter: myfilter, fields: myfields })
    // console.log(classesPublished.data + "test")
    return classesPublished.data;
}



export const getTrainers = async (value) => {
    const trainers = directus.items('trainers');

    var myfilter = '';
    if (value) {
        myfilter = {
            "status": {
                "_eq": 'published',
            }
        }
    }
    else {
        myfilter = {
            "status": {
                "_eq": 'published',
            },


        }

    }


    // var myfields = ['*,carousel.comp_carousel_items_id.*']
    var myfields = ['*']
    const trainersPublished = await trainers.readByQuery({ filter: myfilter, fields: myfields })
    // console.log(JSON.stringify(trainersPublished.data) + "Trainers")
    return trainersPublished.data;
}
export const getPopup = async (value) => {
    const popup = directus.items('popup');

    var myfilter = '';
    if (value) {
        myfilter = {
            "status": {
                "_eq": 'published',
            }
        }
    }
    else {
        myfilter = {
            "status": {
                "_eq": 'published',
            },


        }

    }

    var myfields = ['*']
    const popupPublished = await popup.readByQuery({ filter: myfilter, fields: myfields })
    return popupPublished.data;
}
export const getPrivateCarousel = async (value) => {
    const carousel = directus.items('private_area_carousel');

    var myfilter = '';
    if (value) {
        myfilter = {
            "status": {
                "_eq": 'published',
            }
        }
    }
    else {
        myfilter = {
            "status": {
                "_eq": 'published',
            },


        }

    }

    var myfields = ['*']
    const carouselPublished = await carousel.readByQuery({ filter: myfilter, fields: myfields })
    return carouselPublished.data;
}
export const createuser = async () => {
    const users = directus.items("send_cv");
    var firstNameToUse = localStorage.getItem('first_name');
    var lastNameToUse = localStorage.getItem('last_name');
    var emailToUse = localStorage.getItem('email');
    var phoneNumberToUse = localStorage.getItem('phone_number');
    var mobileNumberToUse = localStorage.getItem('mobile_number');
    var educationToUse = localStorage.getItem('education');
    var experienceToUse = localStorage.getItem('experience');
    var cvToUse = localStorage.getItem('cv')
    async function readFile() {
    var base64 = localStorage.getItem("file");
    // console.log("base64", JSON.parse(base64))
    // const form = new FormData();
    // form.append("file", base64);
    // const response = await axios.post(`https://fzcms.diastora.com/files`, form);
    // console.log(response)
    // var base64Parts = base64.split(",");
    // var fileFormat = base64Parts[0].split(";")[1];
    // var fileContent = base64Parts[1];
    // var file = new File([fileContent], "file name here", {type: fileFormat});
    // console.log(file)
    return file;
    }
    readFile();
    const annoncesPublished = await users.createOne({
        first_name: firstNameToUse,
        last_name: lastNameToUse,
        email: emailToUse,
        phone_number: phoneNumberToUse,
        mobile_number: mobileNumberToUse,
        education: educationToUse,
        experience: experienceToUse,
        cv: localStorage.getItem('file_id')
    });
    return annoncesPublished;
    
}
export const createDubaiuser = async () => {
    const users = directus.items("send_cv_dubai");
    var firstNameToUse = localStorage.getItem('first_name');
    var lastNameToUse = localStorage.getItem('last_name');
    var emailToUse = localStorage.getItem('email');
    var phoneNumberToUse = localStorage.getItem('phone_number');
    var mobileNumberToUse = localStorage.getItem('mobile_number');
    var educationToUse = localStorage.getItem('education');
    var experienceToUse = localStorage.getItem('experience');
    var cvToUse = localStorage.getItem('cv')
    async function readFile() {
    var base64 = localStorage.getItem("file");
    // console.log("base64", JSON.parse(base64))
    // const form = new FormData();
    // form.append("file", base64);
    // const response = await axios.post(`https://fzcms.diastora.com/files`, form);
    // console.log(response)
    // var base64Parts = base64.split(",");
    // var fileFormat = base64Parts[0].split(";")[1];
    // var fileContent = base64Parts[1];
    // var file = new File([fileContent], "file name here", {type: fileFormat});
    // console.log(file)
    return file;
    }
    readFile();
    const annoncesPublished = await users.createOne({
        first_name: firstNameToUse,
        last_name: lastNameToUse,
        email: emailToUse,
        phone_number: phoneNumberToUse,
        mobile_number: mobileNumberToUse,
        education: educationToUse,
        experience: experienceToUse,
        cv: localStorage.getItem('file_id')
    });
    return annoncesPublished;
    
}
// export default function handler(req, res) {
    
//     res.status(200).json({ name: 'John Doe' })
// }

export const createFreeTrialUser = async () => {
    const users = directus.items("free_trial");
    var nameToUse = localStorage.getItem('name');
    var phoneNumberToUse = localStorage.getItem('phone_number');
    var emailToUse = localStorage.getItem('email');
    var mobileNumberToUse = localStorage.getItem('mobile_number');
    var locationToUse = localStorage.getItem('location') 
    const annoncesPublished = await users.createOne({
        name: nameToUse,
        phone_number: phoneNumberToUse,
        email: emailToUse,
        mobile_number: mobileNumberToUse,
        location: locationToUse
    });
    return annoncesPublished;
    
}
export const createFreeTrialDubaiUser = async () => {
    const users = directus.items("free_trialDubai");
    var nameToUse = localStorage.getItem('name');
    var phoneNumberToUse = localStorage.getItem('phone_number');
    var emailToUse = localStorage.getItem('email');
    var mobileNumberToUse = localStorage.getItem('mobile_number');
    var locationToUse = localStorage.getItem('location') 
    const annoncesPublished = await users.createOne({
        name: nameToUse,
        phone_number: phoneNumberToUse,
        email: emailToUse,
        mobile_number: mobileNumberToUse,
        location: locationToUse
    });
    return annoncesPublished;
    
}
export const createContactUsUser = async () => {
    const users = directus.items("contact_us");
    var nameToUse = localStorage.getItem('full_name');
    var emailToUse = localStorage.getItem('email');
    var messageToUse = localStorage.getItem('message');
    const annoncesPublished = await users.createOne({
        full_name: nameToUse,
        email: emailToUse,
        message: messageToUse
    });
    return annoncesPublished;
    
}
export const createContactUsDubaiUser = async () => {
    const users = directus.items("contact_us_dubai");
    var nameToUse = localStorage.getItem('full_name');
    var emailToUse = localStorage.getItem('email');
    var messageToUse = localStorage.getItem('message');
    const annoncesPublished = await users.createOne({
        full_name: nameToUse,
        email: emailToUse,
        message: messageToUse
    });
    return annoncesPublished;
    
}
// export const createOfferUser = async () => {
//     const users = directus.items("offer");
//     var nameToUse = localStorage.getItem('first_name');
//     var lastNameToUse = localStorage.getItem('last_name');
//     var emailToUse = localStorage.getItem('email');
//     var phoneToUse = localStorage.getItem('phone_number');
//     const annoncesPublished = await users.createOne({
//         first_name: nameToUse,
//         last_name: lastNameToUse,
//         email: emailToUse,
//         phone_number: phoneToUse
//     });
//     return annoncesPublished;
    
// }