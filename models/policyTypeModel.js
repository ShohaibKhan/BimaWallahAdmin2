const {db,storage} = require("../config");
const { collection, getDocs, deleteDoc,addDoc , updateDoc, doc } = require('firebase/firestore');
const { ref, uploadBytes, getDownloadURL, deleteObject } = require('@firebase/storage');
const { format } = require('date-fns');

async function imageuploading(file) {
    const currentDateTime = format(new Date(), 'yyyy-MM-dd_HH-mm-ss');
    const storageRef=ref(storage,'Logos/'+currentDateTime);
    const metadata={
        contentType:'image/jpeg'
    };
    await uploadBytes(storageRef, file.buffer,metadata);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
}
async function imageremoving(fileName){
    const stoargeRef=ref(storage,'Logos/'+fileName);
    await deleteObject(stoargeRef);
}


exports.getAllPolicyTypes = async (req, res) => {
    const usersCol = collection(db, 'policyTypes');
    const userSnapshot = await getDocs(usersCol);
    const policyTypesListone = userSnapshot.docs.map(doc => {
        const id = doc.id;
        const data = doc.data();
        return{id,data};
    });
    return policyTypesListone;
}
exports.updatePolicyType = async(file,req)=>{
    const colName = collection(db, 'policyTypes');
    const PolicyTypeSnapshot = (await getDocs(colName)).docs;
    for (let policyType of PolicyTypeSnapshot){
        if (policyType.id == req.PolicyTypeRef){
            const policyTypeDoc = doc(colName,req.PolicyTypeRef);
            const updateData = {
                policy_img:  await imageuploading(file),
                policy_type:req.policyType,
            };
            await updateDoc(policyTypeDoc,updateData);
            return true;
        }
    }
    return false
    
}
exports.deletePolicyType=async(req,res)=>{
    const colName = collection(db, 'policyTypes');
    const parts = req.PolicyTypeFileName.split('%2F');
    const fileName=parts[1].split('?');
    const PolicyTypeSnapshot = (await getDocs(colName)).docs;
    for (let policyType of PolicyTypeSnapshot){
        if (policyType.id == req.PolicyTypeRef){
            await deleteDoc(policyType.ref);
            await imageremoving(fileName[0]);
            return true;
        }
    }
    return false
}
exports.NewPolicyType=async(file,req)=>{
    const colName=collection(db,"policyTypes");
    const updateData={
        policy_img: await imageuploading(file),
        policy_type:req.policyType,
    }
    await addDoc(colName,updateData);
    return true;
}
