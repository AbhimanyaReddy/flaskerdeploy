const firebaseConfig = {
    apiKey: "AIzaSyDYUN9o8ViC1uFs3OlGhXRY5sc6sy1Fwg4",
    authDomain: "cardpay-5a0c2.firebaseapp.com",
    databaseURL: "https://cardpay-5a0c2.firebaseio.com",
    projectId: "cardpay-5a0c2",
    storageBucket: "cardpay-5a0c2.appspot.com",
    messagingSenderId: "467588252342",
    appId: "1:467588252342:web:a22115d964ac6d6bf7dc17",
    measurementId: "G-QM36RWVGC7"
};


firebase.initializeApp(firebaseConfig);
var firestore=firebase.firestore();

// Start Grabbing Our DOM Elements
const submitBtn=document.querySelector('#submit');

let creditcardnumber=document.querySelector('#aname');
let nameonthecard=document.querySelector('#bname');
let expiryear=document.querySelector('#fname');
let expirymonth=document.querySelector('#gname');
let cvv=document.querySelector('#dname');
let amount='13000';


const db=firestore.collection("cards");
const db1=firestore.collection("users");
const db2=firestore.collection("notifications");

submitBtn.addEventListener('click', function()
{
    let creditcardnumberInput=creditcardnumber.value;
    let nameonthecardInput=nameonthecard.value;
    let expirydateInput='0'+expiryear.value+'/'+expirymonth.value;
    let cvvInput=cvv.value;
    let amountInput=13000;
    creditcardnumberInput = creditcardnumberInput.split(" ").join("");
    console.log(creditcardnumberInput);
    console.log(expirydateInput);
    console.log(cvvInput);
    // Access the Data base collection
    db.get().then(function(doc) {
        
        doc.forEach(function(doc1) {
    
            if(doc1.data().cardnumber === creditcardnumberInput && doc1.data().expirydate===expirydateInput && doc1.data().cvv === cvvInput){
       
                if(doc1.data().isonline === 'lock')
                {
                    console.log("HELLO")
                db1.doc(doc1.id).get().then((doc)=> {
                    console.log(doc1.data.isonline)

                        username1 = doc.data().username,
                        phone1 = doc.data().phone,
                        displayname1 = doc.data().displayname,
                        db2.doc(doc1.id).set({
                            amount: amountInput,
                            username: username1,
                            phone: phone1,
                            displayname: displayname1,
                        
                        }).then(function () {
                            console.log("APP IS Locked you will confirm by app");
                            window.alert("CARD is Locked, App Authentication is required");
                        })


                })}
                

            }
            else
            {
                window.alert("YOu will be redirected to bank page");
            }

        });
    });



});

