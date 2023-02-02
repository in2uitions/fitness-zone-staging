import axios from 'axios';
import { Directus } from '@directus/sdk';
import { URL } from '../global_vars';
import Cookies from 'js-cookie'

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
    var firstNameToUse = Cookies.get('first_name');
    var lastNameToUse = Cookies.get('last_name');
    var emailToUse = Cookies.get('email');
    var phoneNumberToUse = Cookies.get('phone_number');
    var mobileNumberToUse = Cookies.get('mobile_number');
    var educationToUse = Cookies.get('education');
    var experienceToUse = Cookies.get('experience');
    var cvToUse = Cookies.get('cv')
    async function readFile() {
    var base64 = Cookies.get("file");
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
        cv: Cookies.get('file_id')
    });
    return annoncesPublished;
    
}
export const createDubaiuser = async () => {
    const users = directus.items("send_cv_dubai");
    var firstNameToUse = Cookies.get('first_name');
    var lastNameToUse = Cookies.get('last_name');
    var emailToUse = Cookies.get('email');
    var phoneNumberToUse = Cookies.get('phone_number');
    var mobileNumberToUse = Cookies.get('mobile_number');
    var educationToUse = Cookies.get('education');
    var experienceToUse = Cookies.get('experience');
    var cvToUse = Cookies.get('cv')
    async function readFile() {
    var base64 = Cookies.get("file");
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
        cv: Cookies.get('file_id')
    });
    return annoncesPublished;
    
}
// export default function handler(req, res) {
    
//     res.status(200).json({ name: 'John Doe' })
// }

export const createFreeTrialUser = async () => {
    const users = directus.items("free_trial");
    var nameToUse = Cookies.get('name');
    var phoneNumberToUse = Cookies.get('phone_number');
    var emailToUse = Cookies.get('email');
    var mobileNumberToUse = Cookies.get('mobile_number');
    var locationToUse = Cookies.get('location') 
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
    var nameToUse = Cookies.get('name');
    var phoneNumberToUse = Cookies.get('phone_number');
    var emailToUse = Cookies.get('email');
    var mobileNumberToUse = Cookies.get('mobile_number');
    var locationToUse = Cookies.get('location') 
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
    var nameToUse = Cookies.get('full_name');
    var emailToUse = Cookies.get('email');
    var messageToUse = Cookies.get('message');
    const annoncesPublished = await users.createOne({
        full_name: nameToUse,
        email: emailToUse,
        message: messageToUse
    });
    return annoncesPublished;
    
}
export const createContactUsDubaiUser = async () => {
    const users = directus.items("contact_us_dubai");
    var nameToUse = Cookies.get('full_name');
    var emailToUse = Cookies.get('email');
    var messageToUse = Cookies.get('message');
    const annoncesPublished = await users.createOne({
        full_name: nameToUse,
        email: emailToUse,
        message: messageToUse
    });
    return annoncesPublished;
    
}
// export const createOfferUser = async () => {
//     const users = directus.items("offer");
//     var nameToUse = Cookies.get('first_name');
//     var lastNameToUse = Cookies.get('last_name');
//     var emailToUse = Cookies.get('email');
//     var phoneToUse = Cookies.get('phone_number');
//     const annoncesPublished = await users.createOne({
//         first_name: nameToUse,
//         last_name: lastNameToUse,
//         email: emailToUse,
//         phone_number: phoneToUse
//     });
//     return annoncesPublished;
    
// }