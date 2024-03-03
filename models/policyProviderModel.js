const {db,storage} = require("../config");
const { collection, getDocs, deleteDoc,addDoc , updateDoc, doc } = require('firebase/firestore');
const { ref, uploadBytes, getDownloadURL,deleteObject } = require('@firebase/storage');
const { format } = require('date-fns');

async function imageuploading(file) {
    const currentDateTime = format(new Date(), 'yyyy-MM-dd_HH-mm-ss');
    const storageRef=ref(storage,"provider_logo's/"+currentDateTime);
    const metadata={
        contentType:'image/jpeg'
    };
    await uploadBytes(storageRef, file.buffer,metadata);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
}
async function imageremoving(fileName){
    const stoargeRef=ref(storage,"provider_logo's/"+fileName);
    await deleteObject(stoargeRef);
}

exports.getAllPolicyProviders = async (req, res) => {
    const usersCol = collection(db, 'providers');
    const userSnapshot = await getDocs(usersCol);
    const policyProvidersListone = userSnapshot.docs.map(doc => {
        const id = doc.id;
        const data = doc.data();
        return{id,data};
    });
    return policyProvidersListone;
}
exports.updatePolicyProvider = async(file,req)=>{
    const colName = collection(db, 'providers');
    const PolicyProviderSnapshot = (await getDocs(colName)).docs;
    for (let policyProvider of PolicyProviderSnapshot){
        if (policyProvider.id == req.PolicyProviderRef){
            const policyProviderDoc = doc(colName,req.PolicyProviderRef);
            const updateData = {
                provider_img:  await imageuploading(file),
                provider_name:req.policyProvider,
            };
            await updateDoc(policyProviderDoc,updateData);
            return true;
        }
    }
    return false
    
}
exports.deletePolicyProvider=async(req,res)=>{
    const colName = collection(db, 'providers');
    const parts = req.PolicyProviderFileName.split('%2F');
    const fileName=parts[1].split('?');
    const PolicyProviderSnapshot = (await getDocs(colName)).docs;
    for (let policyProvider of PolicyProviderSnapshot){
        if (policyProvider.id == req.PolicyProviderRef){
            await deleteDoc(policyProvider.ref);
            await imageremoving(fileName[0]);
            return true;
        }
    }
    return false
}
exports.NewPolicyProviders=async(file,req)=>{
    const colName=collection(db,'providers');
    const updateData={
        provider_img: await imageuploading(file),
        provider_name:req.policyProvider,
    }
    await addDoc(colName,updateData);
    return true;
}
