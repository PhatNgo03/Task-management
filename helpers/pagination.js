module.exports = (objectPagination, query, countRecords) => {
  if(query.page){
    objectPagination.currentPage = parseInt(query.page); //truyen vao lay trang hien tai
  }
  if(query.limit){
    objectPagination.limitItems = parseInt(query.limit); //truyen vao giới hạn lấy giới hạn hien tai
  }
  objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;
  const totalPage = Math.ceil(countRecords/objectPagination.limitItems);
  objectPagination.totalPage = totalPage;

  return objectPagination;
}

