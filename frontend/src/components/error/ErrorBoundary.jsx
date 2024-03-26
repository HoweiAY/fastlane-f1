import React from "react";

import Error from "../../pages/error/Error";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
        this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error(error, errorInfo);
    }

    resetErrorBoundary() {
        this.state = { hasError: false };
    }

    render() {
        if (this.state.hasError) {
            return (<Error onClick={this.resetErrorBoundary}/>)
        }
        return this.props.children;
    }
}

export default ErrorBoundary;