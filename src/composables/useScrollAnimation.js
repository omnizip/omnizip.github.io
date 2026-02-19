import { onMounted, onUnmounted } from 'vue'

export function useScrollAnimation(options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
  } = options

  let observer = null

  const initScrollAnimation = () => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            // Optional: unobserve after animation
            // observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold,
        rootMargin,
      }
    )

    // Observe all elements with section-reveal class
    document.querySelectorAll('.section-reveal').forEach((el) => {
      observer.observe(el)
    })
  }

  const cleanup = () => {
    if (observer) {
      observer.disconnect()
    }
  }

  onMounted(() => {
    // Small delay to ensure DOM is ready
    setTimeout(initScrollAnimation, 100)
  })

  onUnmounted(cleanup)

  return {
    initScrollAnimation,
    cleanup,
  }
}
