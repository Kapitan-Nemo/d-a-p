<script setup lang="ts">
import { getDownloadURL, getStorage, ref as storageRef, uploadBytesResumable } from 'firebase/storage'

const storage = getStorage()
const fileInput = ref<HTMLInputElement | null>(null)
const files = ref()

const image = useState('image', () => '')

const progress = ref(0)
async function uploadFile() {
  console.log('uploadFile')
  files.value = fileInput.value?.files
  console.log(files.value)
  if (files.value) {
    console.log(files.value[0].name)
    saveFile()
  }
}

function saveFile() {
  console.log('saveFile')
  const metadata = {
    contentType: 'image/png',
  }
  const file = files.value[0]
  const storagea = storageRef(storage, `images/${file.name}`)
  const uploadTask = uploadBytesResumable(storagea, file, metadata)

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on('state_changed',
    (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      progress.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log(`Upload is ${progress.value}% done`)
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused')
          break
        case 'running':
          console.log('Upload is running')
          break
      }
    },
    (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
        // User doesn't have permission to access the object
          break
        case 'storage/canceled':
        // User canceled the upload
          break

          // ...

        case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
          break
      }
    },
    () => {
    // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL)
        image.value = downloadURL
      })
    },
  )
}
</script>

<template>
  <label class="text-white" for="upload_file">Upload File</label>
  <input id="upload_file" ref="fileInput" name="upload_file" class="" type="file" @change="uploadFile">
</template>
