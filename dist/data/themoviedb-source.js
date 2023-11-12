import API_ENDPOINT from"../../scripts/globals/api-endpoint";class RestaurantSource{static async getList(){try{const t=await fetch(API_ENDPOINT.HOME);return(await t.json()).restaurants}catch(t){return t}}static async detailRestaurant(t){try{const a=await fetch(API_ENDPOINT.DETAIL(t));return(await a.json()).restaurant}catch(t){return t}}static async searchRestaurant(t){try{const a=await fetch(API_ENDPOINT.SEARCH(t));return(await a.json()).restaurants}catch(t){return t}}}export default RestaurantSource;