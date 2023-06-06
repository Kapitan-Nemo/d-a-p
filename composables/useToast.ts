export default function useToast(message: string, type: string, duration?: number) {
  duration = duration || 3000
  const toast = document.createElement('div')

  const position = document.querySelectorAll('.toast').length * 80
  toast.style.bottom = `${position}px`
  toast.classList.add('toast')
  toast.classList.add(`toast--${type}`)
  toast.innerHTML = `${message}<span id="${position}" class="toast--progress" style="width:0%"></span>`
  document.body.appendChild(toast)

  setTimeout(() => {
    toast.classList.add('toast--show')
  }, 100)

  // resolve promise after duration
  setTimeout(() => {
    toast.classList.remove('toast--show')
  }, duration - 500)

  const toastProgress = document.getElementById(`${position}`) as HTMLSpanElement

  let width = 0
  const progress = setInterval(frame, duration / 100)

  function frame() {
    if (width >= 100) {
      clearInterval(progress)
    }
    else {
      width++
      toastProgress.style.width = `${width}%`
    }
  }

  setTimeout(() => {
    toast.classList.remove('toast--show')
  }, duration - 500)

  setTimeout(() => {
    toast.remove()
  }, duration)
}
