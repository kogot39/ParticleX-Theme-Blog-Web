import request from "@/js/api/request.js";

export const getAdminBlogList = (page) => {
	return request({
		url: "/admin/blog",
		method: "get",
        params: { page }
	});
};

export const addBlog = (blog) => {
	return request({
		url: "/admin/blog",
		method: "post",
		data: blog
	});
};

export const deleteBlog = (id) => {
	return request({
		url: "/admin/blog",
		method: "delete",
		params: { id }
	})
}

export const updateBlog = (blog) => {
	return request({
		url: "/admin/blog",
		method: "put",
		data: blog
	})
}