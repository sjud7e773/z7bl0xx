'use client'

import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            className="flex flex-col items-center justify-center py-16 rounded-xl"
            style={{ border: '1px dashed var(--border)', color: 'var(--text-muted)' }}
          >
            <p
              className="text-base font-semibold"
              style={{ fontFamily: 'Inter', color: 'var(--text-secondary)' }}
            >
              Algo deu errado. Recarregue a pí¡gina.
            </p>
          </div>
        )
      )
    }
    return this.props.children
  }
}
