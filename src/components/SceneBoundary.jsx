import { Component } from 'react'

/**
 * Error boundary around the 3D hero.
 *
 * Scene3D is lazy-loaded and pulls an HDR environment map over the network. If
 * that fails — offline, blocked, WebGL unavailable, an old GPU — the throw
 * would otherwise escape Suspense and blank the whole page. The hero is
 * decoration; it must never be able to take the site down with it.
 *
 * On failure we render nothing and the hero simply sits on its gradient.
 */
export default class SceneBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    console.warn('[hero] 3D scene disabled:', error?.message ?? error)
  }

  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}
