import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

export const registerGSAP = () => {
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
  }
}

export const setupScrollTrigger = () => {
  if (typeof window !== 'undefined') {
    ScrollTrigger.defaults({
      markers: false,
    })
  }
}
