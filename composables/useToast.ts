export default function useToast(message: string, type: string, duration: number) {
  const toast = document.createElement('div')
  const position = document.querySelectorAll('.toast').length * 80
  toast.style.bottom = `${position}px`
  toast.classList.add('toast')
  toast.classList.add(`toast--${type}`)
  toast.innerHTML = `${message}<span style="width:0%" class="toast--progress"></span>`

  document.body.appendChild(toast)

  const toastProgress = document.querySelector('.toast--progress') as HTMLSpanElement

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
    toast.remove()
  }, duration)

  return {
    toast,
  }
}
