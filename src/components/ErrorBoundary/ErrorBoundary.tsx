import { Component, type ReactNode, type ErrorInfo } from 'react'
import styles from './ErrorBoundary.module.scss'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(_error: Error, _info: ErrorInfo): void {
    // intentionally empty — errors are caught silently
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className={styles.container}>
          <p className={styles.message}>Something went wrong. Please refresh the page.</p>
        </div>
      )
    }
    return this.props.children
  }
}
