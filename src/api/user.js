import request from "@/utils/request";
export const login = (data) => {
  return request({
    method: "post",
    url: "/v1_0/authorizations",
    data,
  });
};
export const getSmsCode = (mobile) => {
  return request({
    method: "get",
    url: `/v1_0/sms/codes/${mobile}`,
  });
};
