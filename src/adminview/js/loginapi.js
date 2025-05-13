import request from "@/js/api/request.js";

export const loginapi = (passString, passWord) => {
    return request({
        url: "/login",
        method: "post",
        data: {
            passString: passString,
            passWord: passWord
        }
    });
};
