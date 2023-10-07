import _ from "lodash";

const removeDiacritics = (text) => {
  return _.deburr(text).toLowerCase(); // Sử dụng lodash để chuyển đổi chuỗi sang không dấu và lowercase
};

const checkNullUndefined = (data) => {
  let arr = [];
  data.forEach((e) => {
    if (e !== null || e !== undefined) {
      arr.push(e);
    }
  });
  return arr;
};

const isEmpty = (arr) => {
  return arr.length === 0 ? true : false;
};

const updatePerChapter = (dataUpload, dataChapter) => {
  // Kiểm tra nếu dataUpload không có thuộc tính chapter, thì tạo mới mảng chapter
  if (!dataUpload.hasOwnProperty("chapter")) {
    dataUpload.chapter = [];
  }

  // Giới hạn số lượng phần tử để thêm từ dataChapter trong mỗi vòng lặp
  const maxElementsPerLoop = 5;

  // Lặp qua từng phần tử của dataChapter và thêm vào dataUpload.chapter
  for (let i = 0; i < dataChapter.length; i += maxElementsPerLoop) {
    const elementsToAdd = dataChapter.slice(i, i + maxElementsPerLoop);
    dataUpload.chapter.push(...elementsToAdd);
  }
  console.log(dataUpload.chapter);
  return dataUpload;
};
function trimSpacesInMiddle(inputString) {
  // Loại bỏ khoảng trắng ở cả hai đầu của chuỗi
  var trimmedString = inputString.trim();

  // Sử dụng biểu thức chính quy để loại bỏ khoảng trắng ở giữa chuỗi
  trimmedString = trimmedString.replace(/\s+/g, " ");

  return trimmedString;
}

export {
  removeDiacritics,
  checkNullUndefined,
  isEmpty,
  updatePerChapter,
  trimSpacesInMiddle,
};
