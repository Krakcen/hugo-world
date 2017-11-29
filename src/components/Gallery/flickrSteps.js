export default {
    perPage: 30,
    apiKey: "8615623d8608fb8477a1812dc3357a22",
    findUserURL: ( username ) => {
        return ("https://api.flickr.com/services/rest/?nojsoncallback=1&api_key=" + this.a.apiKey + "&format=json&username=" + username + "&method=flickr.people.findbyusername");
    },
    findCollectionTreeURL: ( userId ) => {
        return ("https://api.flickr.com/services/rest/?nojsoncallback=1&api_key=" + this.a.apiKey + "&format=json&user_id=" + userId + "&method=flickr.collections.gettree");
    },
    findPhotosURL: ( albumId, perPage ) => {
        return ("https://api.flickr.com/services/rest/?nojsoncallback=1&api_key=" + this.a.apiKey + "&format=json&photoset_id=" + albumId + "&privacy_filter=1&per_page=" + perPage + "&method=flickr.photosets.getphotos");
    },
};
