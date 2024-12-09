import { BASE_URL } from "../constants/app";
export const getImageProduct = (imageName) => {
    return `${BASE_URL}/static/uploads/images/${imageName}`;
}
export const getImageBlog = (imageName) => {
    return `${BASE_URL}/static/uploads/images/${imageName}`;
}

export const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

export const checkFileImage = (fileName) => {
    const arr = ['png', 'gif', 'jpeg', 'jpg'];
    const lastFileName = fileName.split('.')
    if (arr.includes(lastFileName[lastFileName.length - 1].toLowerCase())) {
        return true;
    } else {
        return false;
    }
}

export const colors = [
    "Đỏ",
    "Xanh lá",
    "Xanh dương",
    "Cam",
    "Tím",
    "Hồng",
    "Đen",
    "Trắng"
]
export const renderId = (ma) => {
    var madh = "";
    for (let i = 0; i < ma.length; i++) {
        if (i > 15) {
            madh += ma[i]
        }
    }
    return madh;
}

export const checkEmail = (email) => {
    const reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return reg.test(email)
}
export const checkPhone = (phone) => {
    const regex = /^(0[1-9]|84[1-9])([0-9]{8})$/;
    return regex.test(phone)
}
export const checkCode = (phone) => {
    const regex = /^([0-9]{6})$/;
    return regex.test(phone)
}