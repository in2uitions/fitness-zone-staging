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
    console.log(JSON.stringify(trainersPublished.data) + "Trainers")
    return trainersPublished.data;
}