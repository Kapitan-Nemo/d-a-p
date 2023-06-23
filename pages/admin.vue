<script setup lang="ts">
import { getDownloadURL, getStorage, ref as storageRef, uploadBytesResumable } from 'firebase/storage'

definePageMeta({
  layout: false,
  middleware: [
    'admin',
  ],
})

const route = useRoute()
const storage = getStorage()
const fileInput = ref<HTMLInputElement | null>(null)
const files = ref()

function uploadFile() {
  files.value = fileInput.value?.files
}

function saveFile() {
// Create the file metadata
/** @type {any} */
  const metadata = {
    contentType: 'image/jpeg',
  }

  const file = files.value[0]
  // Upload file and metadata to the object 'images/mountains.jpg'
  const storagea = storageRef(storage, `images/${file.name}`)
  const uploadTask = uploadBytesResumable(storagea, file, metadata)

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on('state_changed',
    (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log(`Upload is ${progress}% done`)
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
      })
    },
  )
}
</script>

<template>
  <NuxtLayout name="admin">
    <AdminNav class="border-b border-dark-200" />
    <div class="flex bg-dark-100">
      <AdminAside class="border-r border-dark-200" />
      <div class="p-6 w-full">
        <div v-if="route.name === 'admin'">
          <p class="text-white">
            Content Dashboard for boxes
          </p>
          <!-- <input id="" type="file" name="" @change="uploadImage($event)"> -->
          <input ref="fileInput" type="file" @change="uploadFile">
          <button class="text-white" @click="saveFile">
            do something
          </button>
        </div>
        <NuxtPage v-else />
      </div>
    </div>
  </NuxtLayout>
</template>
