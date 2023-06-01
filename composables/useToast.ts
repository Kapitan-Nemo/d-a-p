export default function useToast(message: string, type: string, duration: number) {
  const toast = document.createElement('div')
  const position = document.querySelectorAll('.toast').length * 80
  toast.style.bottom = `${position}px`
  toast.classList.add('toast')
  toast.classList.add(`toast--${type}`)
  toast.textContent = message

  document.body.appendChild(toast)

  setTimeout(() => {
    toast.remove()
  }, duration)

  return {
    toast,
  }
}
