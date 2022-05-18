import axios from "axios";

export async function  getApiData () {
    let data = await axios.get('https://www.rijksmuseum.nl/api/nl/collection?key=E7OQsbv6')
    return data.data
}

