export default async function useToast(message: string, type: string, duration?: number) {
  duration = duration || 3000

  const toast = document.createElement('div')
  const position = document.querySelectorAll('.toast').length * 80
  let width = 0
  toast.style.bottom = `${position}px`
  toast.classList.add('toast')
  toast.classList.add(`toast--${type}`)
  toast.innerHTML = `${message}<span id="${position}" class="toast--progress" style="width:0%"></span>`
  document.body.appendChild(toast)

  const toastProgress = document.getElementById(`${position}`) as HTMLSpanElement
  const progress = setInterval(frame, duration / 100)

  function frame() {
    if (width >= 100) {
      clearInterval(progress)
      toast.classList.remove('toast--show')
      setTimeout(() => {
        toast.remove()
      }, 500)
    }
    else {
      width++
      toastProgress.style.width = `${width}%`
      toast.classList.add('toast--show')
    }
  }
}
