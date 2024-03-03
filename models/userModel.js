const {db,storage} = require("../config");
const { collection, getDocs, deleteDoc, updateDoc, doc } = require('firebase/firestore');

exports.getAllUsers = async (req, res) => {
    const usersCol = collection(db, 'users');
    const userSnapshot = await getDocs(usersCol);
    // const userList = userSnapshot.docs
    //     .filter(doc => doc.exists() && (doc.data().is_agent === undefined || !doc.data().is_agent)) // Check for document existence and is_Agent field
    //     .map(doc => doc.data());
    const userList = userSnapshot.docs
    .map(doc => doc.data());
    return userList;
}

async function getAllApplications(){
    const applicationsCol = collection(db, 'agentApplication');
    const applicationSnapshot = await getDocs(applicationsCol);
    
    const applicationList = applicationSnapshot.docs.map(doc => doc.data())
    
    return applicationList
    
}

exports.getAllAgentApplications = async (req, res) => {
    
    return getAllApplications();
    
}



exports.getSingleUser = async (req, res) => {
    
    let arr = [0,0];
    const usersSingle = collection(db, 'users');
    const userSnapshotSingle = await getDocs(usersSingle);
    const userListSingle = userSnapshotSingle.docs
        .filter(doc => doc.exists() && (doc.data().uid === req)) // Check for document existence and is_Agent field
        .map(doc => doc.data());
        arr[0] = userListSingle[0];
        const applicationListSingle = getAllApplications();
        
        await applicationListSingle.then(res=>{
            arr[1] = res.filter((d)=>d.userRef == req)[0];
    })
    
    // Query the 'users' collection based on the provided userRef
    
    return arr;
};

exports.deleteAgentApplication = async (req, res) => {
    const applicationsColDelete = collection(db, 'agentApplication');
    const applicationsColDeleteusers = collection(db, 'users');
    const applicationSnapshotDelete = (await getDocs(applicationsColDelete)).docs;
    applicationSnapshotDelete.forEach(async ele=>{
        if (ele.data().userRef == req){
            await deleteDoc(ele.ref);
            const userDocRef = doc(applicationsColDeleteusers, req);
            const updateData = {
                accountStatus: 'reject',
                // Add more variables as needed
            };
            await updateDoc(userDocRef,updateData);
        }
        else{
            console.log(ele.data().userRef, req);
        }
    })
    
};

exports.updateFieldByRef=async(req,res)=>{
    const colName = collection(db, 'users');
    const docName = (await getDocs(colName)).docs;
    docName.forEach(async ele=>{
        if (ele.data().uid == req){
            const userDocRef = doc(colName,req);
            const updateData = {
                accountStatus: 'success',
                is_agent:true,
            };
            await updateDoc(userDocRef,updateData);
        }
    
    });
    console.log("updating the agentDoc");
    const colName2 = collection(db, 'agentApplication');
    const docName2 = (await getDocs(colName2)).docs;
    docName2.forEach(async ele=>{
        if (ele.data().userRef == req){
            console.log("updated the doc");
            const applicationRef = doc(colName2,ele.id);
            const updateData = {
                verified: true,
            };
            await updateDoc(applicationRef,updateData);
        }
    });

}

exports.updateDYN = async (req,res)=>{
    console.log("the data got is", req);
    const colName = collection(db, 'dyn');
    const docName =  (await getDocs(colName)).docs;
    for (const ele of docName){
        console.log("data extracted is", ele.data());
        if (ele.data().unique == true){
            console.log("updated DYN!", ele.id);
            const dynDOC = doc(colName,ele.id);
            const updateData = {
                title: req.title,
                description:req.desc[1],
                semDesc:req.desc[0],
            };
            await updateDoc(dynDOC,updateData);
            console.log("sending true");
            return true;
        };
    };
    return false;

}
exports.getDYN = async(req,res)=>{

    const dynCol = collection(db, 'dyn');
    const dynSnapshot = await getDocs(dynCol);
    
    const dynList = dynSnapshot.docs.map(doc => doc.data());
    
    return dynList[0];

}





