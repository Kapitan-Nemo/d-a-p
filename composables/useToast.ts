export default async function useToast(message: string, type: string, duration?: number) {
  new Promise(() => {
    const toasts = document.querySelectorAll('.toast')

    toasts.forEach((toast) => {
      toast.remove()
    })

    duration = duration || 3000
    const toast = document.createElement('div')
    const toastID = document.querySelectorAll('.toast').length
    let width = 0
    toast.classList.add('toast')
    toast.classList.add(`toast--${type}`)
    toast.innerHTML = `${message}<span id="${toastID}" class="toast--progress" style="width:0%"></span>`
    document.body.appendChild(toast)

    const toastProgress = document.getElementById(`${toastID}`) as HTMLSpanElement
    const progress = setInterval(frame, duration / 100)

    function frame() {
      if (width >= 100) {
        clearInterval(progress)
        toast.classList.remove('toast--show')
      }
      else {
        width++
        toastProgress.style.width = `${width}%`
        toast.classList.add('toast--show')
      }
    }
  }).catch((error) => {
    console.error(error)
  })
}
