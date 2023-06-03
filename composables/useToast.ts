export default function useToast(message: string, type: string, duration?: number) {
  duration = duration || 3000
  const toast = document.createElement('div')

  const position = document.querySelectorAll('.toast').length * 80
  toast.style.bottom = `${position}px`
  toast.classList.add('toast')
  toast.classList.add(`toast--${type}`)
  toast.innerHTML = `${message}<span id="${position}" class="toast--progress" style="width:0%"></span>`
  document.body.appendChild(toast)

  const toastProgress = document.getElementById(`${position}`) as HTMLSpanElement

  let width = 0
  const progress = setInterval(frame, duration / 100)

  function frame() {
    if (width >= 100) {
      clearInterval(progress)
    }
    else {
      width++
      if (width === 1)
        toastProgress.style.backgroundColor = 'green'

      else if (width === 40)
        toastProgress.style.backgroundColor = 'orange'

      else if (width === 70)
        toastProgress.style.backgroundColor = 'red'

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
