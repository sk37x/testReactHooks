import React from 'react'


const updateUser = () => {
    console.log("updateUser")

    /*
    if (food.imageUri) {
      const fileExtension = food.imageUri.split('.').pop();
      console.log("EXT: " + fileExtension);
  
      var uuid = uuidv4();
  
      const fileName = `${uuid}.${fileExtension}`;
      console.log(fileName);
  
      var storageRef = firebase.storage().ref(`foods/images/${fileName}`);
  
      storageRef.putFile(food.imageUri)
        .on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          snapshot => {
            console.log("snapshot: " + snapshot.state);
            console.log("progress: " + (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
  
            if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
              console.log("Success");
            }
          },
          error => {
            unsubscribe();
            console.log("image upload error: " + error.toString());
          },
          () => {
            storageRef.getDownloadURL()
              .then((downloadUrl) => {
                console.log("File available at: " + downloadUrl);
  
                food.image = downloadUrl;
  
                delete food.imageUri;
  
                if (updating) {
                  console.log("Updating....");
                  updateFood(food, onFoodUploaded);
                } else {
                  console.log("adding...");
                  addFood(food, onFoodUploaded);
                }
              })
          }
        )
    } else {
      console.log("Skipping image upload");
  
      delete food.imageUri;
  
      if (updating) {
        console.log("Updating....");
        updateFood(food, onFoodUploaded);
      } else {
        console.log("adding...");
        addFood(food, onFoodUploaded);
      }
    }

    */
  }


  export default updateUser;