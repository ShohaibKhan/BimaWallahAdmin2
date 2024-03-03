const { all } = require("../Routes/userRoutes");
const {db,storage} = require("../config");
const { collection, getDocs, deleteDoc, updateDoc, doc } = require('firebase/firestore');


async function getAllPolicies(uid){

    const policiesCol = collection(db, 'users', uid, 'policies');
    const policiesSnapshot = await getDocs(policiesCol);
    const policyList = policiesSnapshot.docs
    return policyList;
    
}

async function getAllUsers() {
    const usersCol = collection(db, 'users');
    const userSnapshot = await getDocs(usersCol);
    const userList = userSnapshot.docs.map(doc=>doc.data())
    return userList;
}

exports.getAllUnverifiedPolicies = async (req,res)=>{
    let allPolicies = {};
    const allUsers = await getAllUsers();
    console.log(allUsers[0].ref)
    for (user of allUsers){
        const userPolicyDocs = (await getAllPolicies(user.uid));
        for (let doc of userPolicyDocs){
            console.log("checking the dtaa ", doc.id);
        }
        let policyData = []
        for (let doc of userPolicyDocs){
            
            if (doc.data().policy_number==undefined){
                let jsonData = doc.data()
                jsonData.policyID = doc.id
                policyData.push(jsonData)
            }
            
        }
        allPolicies[user.uid] = policyData;
        // // console.log("policyId got is",userPolicyDocs.data());
        // const userPolicy = userPolicyDocs.filter(doc=>doc.data().policy_number == undefined).map(doc=>doc.data());
        // allPolicies[user.uid] = userPolicy;
    }
    return allPolicies;
}

exports.updatePolicy = async(req,res)=>{

    let userPolicyDocs = await getAllPolicies(req.userRef);
    const colName = collection(db, 'users',req.userRef,"policies");
    for (let policy of userPolicyDocs){
        if (policy.id == req.policyID){
            const policyDoc = doc(colName,req.policyID);
            const updateData = {
                policy_number: req.policyNo,
                name_or_number:req.non,
            };
            await updateDoc(policyDoc,updateData);
            return true;
        }
    }
    return false
    
}