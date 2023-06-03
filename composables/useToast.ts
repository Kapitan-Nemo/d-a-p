export default function useToast(message: string, type: string, duration: number) {
  const toast = document.createElement('div')
  const position = document.querySelectorAll('.toast').length * 80
  toast.style.bottom = `${position}px`
  toast.classList.add('toast')
  toast.classList.add(`toast--${type}`)
  toast.innerHTML = `${message}<span style="width:0%" class="toast--progress"></span>`

  document.body.appendChild(toast)

  const elem = document.querySelector('.toast--progress') as HTMLElement

  let width = 0
  const bar = setInterval(frame, duration / 100)
  function frame() {
    if (width >= 100) {
      clearInterval(bar)
    }
    else {
      width++
      elem.style.width = `${width}%`
    }
  }

  setTimeout(() => {
    toast.remove()
  }, duration)

  return {
    toast,
  }
}
