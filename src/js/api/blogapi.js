import request from "./request.js";

export const getBlogList = (page) => {
  return request({
    url: "/blog",
    method: "get",
    params: { page },
  });
};

export const getBlogPage= (id)=>{
  return request({
    url: "/blog/blogpage",
    method: "get",
    params: { id },
  });
}
 