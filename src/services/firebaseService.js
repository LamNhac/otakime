import { Modal, message } from "antd";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
} from "firebase/firestore";
import { app, database } from "./firebase";

import dayjs from "dayjs";
import { getAnalytics } from "firebase/analytics";
import { onValue, ref, update } from "firebase/database";
import {
  getDownloadURL,
  getStorage,
  ref as storageReference,
  uploadBytes,
} from "firebase/storage";
import Config from "../config";

const storage = getStorage(app);
const firestore = getFirestore(app);
// Initialize Analytics and get a reference to the service
const analytics = getAnalytics(app);

const saveToLog = (method, collectionPath, data) => {
  const currentDate = dayjs(dayjs()).format(Config.dateTimeFormat);
  const params = {
    ...data,
    dateUpdate: currentDate,
    method: method,
  };
  // Kiểm tra xem chuỗi có chứa "manga" hay không
  if (collectionPath.includes("manga")) {
    params.path = "manga";
  }

  // Kiểm tra xem chuỗi có chứa "movie" hay không
  if (collectionPath.includes("movie")) {
    params.path = "movie";
  }
  // Kiểm tra xem chuỗi có chứa "uploadImage" hay không
  if (collectionPath.includes("uploadImage")) {
    params.path = "uploadImage";
  }

  addDocument("log", params).then(() => {
    console.log("Lưu log!");
  });
  console.log("params LOG", params)
};

// Create (Thêm dữ liệu)
const addDocument = (collectionPath, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = await addDoc(collection(firestore, collectionPath), data);
      const newDocument = { ...data, id: docRef.id }; // Sử dụng id của Firebase

      await updateDoc(doc(firestore, collectionPath, docRef.id), newDocument);
      console.log(newDocument);
      console.log("Tài liệu đã được thêm vào Firestore với ID:", docRef.id);

      resolve(newDocument);
    } catch (error) {
      console.error("Lỗi khi thêm tài liệu vào Firestore:", error);
      reject(error);
    }
  });
};

// Read (Đọc dữ liệu)
const getDocument = (collectionPath, docId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(firestore, collectionPath, docId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // console.log("Dữ liệu tài liệu:", docSnap.data());
        resolve(docSnap.data()); // Trả về dữ liệu của tài liệu
      } else {
        console.log("Không tìm thấy tài liệu với ID:", docId);
        resolve(null); // Trả về null nếu không tìm thấy tài liệu
      }
    } catch (error) {
      console.error("Lỗi khi đọc tài liệu từ Firestore:", error);
      message.error(error);
      reject(error); // Trả về lỗi để xử lý bên ngoài
    }
  });
};

const getAllDocuments = async (collectionPath) => {
  return new Promise(async (resolve, reject) => {
    try {
      let arr = [];
      let q = query(collection(firestore, collectionPath));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });

      resolve(arr);
    } catch (error) {
      console.error("Lỗi khi đọc danh sách tài liệu từ Firestore:", error);
      Modal.error({
        title: "getAllDocuments",
        content: error,
      });
    }
  });
};
// Update (Cập nhật dữ liệu)
const updateDocument = (collectionPath, docId, newData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(firestore, collectionPath, docId);
      await updateDoc(docRef, newData);
      console.log("Tài liệu đã được cập nhật thành công trong Firestore.");
      resolve(newData);
    } catch (error) {
      console.error("Lỗi khi cập nhật tài liệu trong Firestore:", error);
      message.error(error); // Tùy thuộc vào thư viện bạn sử dụng để hiển thị thông báo lỗi
    }
  });
};

// Delete (Xóa dữ liệu)
const deleteDocument = (collectionPath, docId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(firestore, collectionPath, docId);
      await deleteDoc(docRef);
      console.log("Tài liệu đã được xóa khỏi Firestore.");
      resolve();
    } catch (error) {
      console.error("Lỗi khi xóa tài liệu từ Firestore:", error);
      message.error(error); // Tùy thuộc vào thư viện bạn sử dụng để hiển thị thông báo lỗi
    }
  });
};

const deleteCollectionAndSubcollections = async (collectionRef) => {
  try {
    const querySnapshot = await getDocs(collectionRef);
    console.log("querySnapshot",querySnapshot)
    const deletePromises = querySnapshot.docs.map(async (doc) => {
      const subcollectionRefs = await getDocs(collection(doc.ref));

      if (subcollectionRefs.size > 0) {
        // If the document has subcollections, recursively delete them
        const deleteSubcollectionsPromises = subcollectionRefs.docs.map(async (subDoc) => {
          await deleteCollectionAndSubcollections(collection(subDoc.ref));
        });

        await Promise.all(deleteSubcollectionsPromises);
      }

      await deleteDoc(doc.ref);
    });

    await Promise.all(deletePromises);

    console.log("All documents and subcollections have been deleted.");
  } catch (error) {
    console.error("Error deleting documents and subcollections:", error);
    throw error;
  }
};

const deleteAllDocuments = async (collectionPath) => {
  const collectionRef = collection(firestore, collectionPath);
  await deleteCollectionAndSubcollections(collectionRef);
};


const uploadFile = async (file, path) => {
  try {
    const storageRef = storageReference(storage, path);
    await uploadBytes(storageRef, file);

    // Get the download URL after successful upload
    const downloadURL = await getFileDownloadURL(path);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

const getFileDownloadURL = (path) => {
  const fileRef = storageReference(storage, path);
  return getDownloadURL(fileRef);
};



// Thêm một document vào collection
 const addDocumentRealtime = (collection, data) => {
  const newRef = database.ref(collection).push();
  return newRef.set(data);
};

// Lấy tất cả documents từ collection
 const getAllDocumentsRealtime  = (collection) => {
 const res =  ref(database, collection)  
 return new Promise((resolve, reject)=>{
  onValue(res, (snapshot) => {
    const data = snapshot.val();
    resolve(data)
  });
 })  
 
  // return database.ref(collection).once('value').then((snapshot) => {
  //   const data = snapshot.val();
  //   return data ? Object.values(data) : [];
  // });
};

// Lấy một document từ collection theo id
 const getDocumentByIdRealtime  = (collection, id) => {
  return database.ref(`${collection}/${id}`).once('value').then((snapshot) => {
    return snapshot.val();
  });
};

// Cập nhật một document trong collection theo id
 const updateDocumentRealtime  = (collection, data) => {
    update(ref(database), data)
};

// Xóa một document trong collection theo id
 const deleteDocumentRealtime  = (collection, id) => {
  return database.ref(`${collection}/${id}`).remove();
};


export {
  addDocument, addDocumentRealtime, analytics, deleteAllDocuments, deleteDocument, deleteDocumentRealtime, getAllDocuments, getAllDocumentsRealtime, getDocument, getDocumentByIdRealtime, saveToLog, updateDocument, updateDocumentRealtime, uploadFile
};

