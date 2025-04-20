module.exports = (query) => {
   let objectSearch = {
    keyword : "",
   }
   if(query.keyword){
    objectSearch.keyword = query.keyword; 
 
     const regex = new RegExp(objectSearch.keyword, "i"); //regex phan tich khi nhap keyword va lay gia tri
     objectSearch.regex = regex;
   }
   return objectSearch;
}